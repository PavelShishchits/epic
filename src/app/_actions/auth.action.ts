'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import 'server-only';

import { getSessionId } from '@/app/_utils/getSessionId';
import { AuthenticationError, InputParseError } from '@/entities/errors';
import { Cookie } from '@/entities/models/cookie';
import { loginController } from '@/interface-adapters/controllers/login.controller';
import { signOutController } from '@/interface-adapters/controllers/sign-out.controller';
import { signUpController } from '@/interface-adapters/controllers/sign-up.controller';
import { SESSION_NAME } from '@/lib/auth.server';
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

async function logOutAction(formData: FormData) {
  new HoneyPot().check(formData);

  const cookiesStore = await cookies();
  const sessionId = await getSessionId();
  let sessionCookie;
  try {
    const result = await signOutController(sessionId);
    sessionCookie = result.cookie;
  } catch (e) {
    return {
      error: 'Something went wrong',
    };
  }

  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect('/login');
}

export { signUpAction, signInAction, logOutAction };
