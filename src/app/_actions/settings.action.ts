'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import 'server-only';

import { AuthenticationError, InputParseError } from '@/entities/errors';
import { editProfileController } from '@/interface-adapters/controllers/edit-profile.controller';
import { HoneyPot } from '@/lib/honeypot.server';

type editProfileActionProps = {
  userId: string;
};
async function editProfileAction(
  { userId }: editProfileActionProps,
  prevState: any,
  formData: FormData
) {
  new HoneyPot().check(formData);

  try {
    const updatedUser = await editProfileController(userId, formData);
    console.log('updatedUser', updatedUser);
  } catch (e) {
    if (e instanceof InputParseError) {
      return {
        toastError: 'Incorrect data',
      };
    }

    if (e instanceof AuthenticationError) {
      return {
        toastError: e.message,
      };
    }
    return {
      toastError: 'Something went wrong',
    };
  }

  revalidatePath('/settings/profile');
  // ToDo: have to redirect to the same page to update the user data https://github.com/edmundhung/conform/issues/797
  redirect('/settings/profile');
}

export { editProfileAction };
