'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import 'server-only';

import { InputParseError } from '@/entities/errors';
import { deleteNoteController } from '@/interface-adapters/controllers/delete-note.controller';
import { editNoteController } from '@/interface-adapters/controllers/edit-note.controller';
import { HoneyPot } from '@/lib/honeypot.server';

// import { createToastCookie } from '@/lib/toast.server';

type AdditionalProps = {
  noteId: string;
  userId: string;
};

async function editNoteAction(
  { noteId, userId }: AdditionalProps,
  formData: FormData
) {
  try {
    new HoneyPot().check(formData);
    const editedNote = await editNoteController(noteId, formData);

    console.log('editedNote', editedNote);
  } catch (e) {
    if (e instanceof InputParseError) {
      return {
        error: e.message,
      };
    }

    console.log('error', e);
    // toDo show error message to user

    return {
      error: 'Something went wrong',
    };
  }

  revalidatePath('/users/' + userId + '/notes/' + noteId);
  redirect('/users/' + userId + '/notes/' + noteId);
}

async function deleteNoteAction(
  { noteId, userId }: AdditionalProps,
  formData: FormData
) {
  const intent = formData.get('intent')!;

  switch (intent) {
    case 'delete':
      try {
        const deletedNote = await deleteNoteController(noteId);
        // createToastCookie('Successfully deleted');
        console.log('deletedNote', deletedNote);
      } catch (e) {
        return {
          error: 'Something went wrong',
        };
      }

      revalidatePath('/users/' + userId + '/notes');
      redirect('/users/' + userId + '/notes');
    default:
      console.error('Invalid intent');
      break;
  }
}

export { editNoteAction, deleteNoteAction };
