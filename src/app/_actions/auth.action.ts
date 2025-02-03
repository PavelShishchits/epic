'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { parseWithZod } from '@conform-to/zod';
import 'server-only';

import { AuthenticationError, InputParseError } from '@/entities/errors';
import { Cookie } from '@/entities/models/cookie';
import { loginController } from '@/interface-adapters/controllers/login.controller';
import { HoneyPot } from '@/lib/honeypot.server';
import { userLoginSchema, userRegisterSchema } from '@/schema/user';

async function signUpAction(prevState: any, formData: FormData) {
  new HoneyPot().check(formData);

  const submission = parseWithZod(formData, {
    schema: userRegisterSchema,
  });

  console.log('submission', submission);

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { email } = submission.value;
  console.log('register user', submission.value);

  revalidatePath('/');
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
