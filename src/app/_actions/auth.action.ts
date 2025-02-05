'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import 'server-only';

import { AuthenticationError, InputParseError } from '@/entities/errors';
import { Cookie } from '@/entities/models/cookie';
import { loginController } from '@/interface-adapters/controllers/login.controller';
import { signUpController } from '@/interface-adapters/controllers/sign-up.controller';
import { HoneyPot } from '@/lib/honeypot.server';

async function signUpAction(prevState: unknown, formData: FormData) {
  new HoneyPot().check(formData);

  const cookiesStore = await cookies();
  let sessionCookie: Cookie;

  try {
    const result = await signUpController(formData);
    sessionCookie = result.cookie;
  } catch (e) {
    if (e instanceof AuthenticationError) {
      return {
        toastError: e.message,
      };
    }
    return {
      toastError: 'Something went wrong',
    };
  }

  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect('/');
}

async function signInAction(formData: FormData) {
  new HoneyPot().check(formData);

  const cookiesStore = await cookies();
  let sessionCookie: Cookie;

  try {
    const result = await loginController(formData);
    sessionCookie = result.cookie;
  } catch (e) {
    if (e instanceof InputParseError || e instanceof AuthenticationError) {
      return {
        error: 'Incorrect username or passwrod',
      };
    }

    return {
      error: 'Something went wrong',
    };
  }

  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect('/');
}

export { signUpAction, signInAction };
