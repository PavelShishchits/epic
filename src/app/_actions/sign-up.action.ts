'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { parseWithZod } from '@conform-to/zod';
import 'server-only';

import { HoneyPot } from '@/lib/honeypot.server';
import { userRegisterSchema } from '@/schema/user';

async function signUp(prevState: any, formData: FormData) {
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

export { signUp };
