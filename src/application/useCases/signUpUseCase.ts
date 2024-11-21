'use server';
import 'server-only';
import { parseWithZod } from '@conform-to/zod';
import { userRegisterSchema } from '@/schema/user';
import { HoneyPot } from '@/lib/honeypot.server';

export async function signUp(prevState: any, formData: FormData) {
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
}
