'use server';
import 'server-only';

import { InputParseError } from '@/entities/errors';
import { editNoteController } from '@/interface-adapters/controllers/edit-note.controller';
import { deleteNoteController } from '@/interface-adapters/controllers/delete-note.controller';
import { HoneyPot } from '@/lib/honeypot.server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type AdditionalProps = {
  noteId: string;
  userId: string;
};

async function editNoteAction(
  { noteId, userId }: AdditionalProps,
  prevState: any,
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
      const deletedNote = await deleteNoteController(noteId);

      console.log('deletedNote', deletedNote);

      revalidatePath('/users/' + userId + '/notes');
      redirect('/users/' + userId + '/notes');
    default:
      console.error('Invalid intent');
      break;
  }
}

export { editNoteAction, deleteNoteAction };
