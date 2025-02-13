'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import 'server-only';

import { getSessionId } from '@/app/_utils/getSessionId';
import { InputParseError } from '@/entities/errors';
import { addNoteController } from '@/interface-adapters/controllers/add-note.controller';
import { deleteNoteController } from '@/interface-adapters/controllers/delete-note.controller';
import { editNoteController } from '@/interface-adapters/controllers/edit-note.controller';
import { HoneyPot } from '@/lib/honeypot.server';

type AdditionalProps = {
  noteId: string;
  username: string;
};

async function editNoteAction(
  { noteId, username }: AdditionalProps,
  formData: FormData
) {
  try {
    new HoneyPot().check(formData);
    await editNoteController(formData, noteId);
  } catch (e) {
    if (e instanceof InputParseError) {
      return {
        error: e.message,
      };
    }

    return {
      error: 'Something went wrong',
    };
  }

  revalidatePath('/users/' + username + '/notes/' + noteId);
  redirect('/users/' + username + '/notes/' + noteId);
}

async function addNoteAction(
  { username }: Pick<AdditionalProps, 'username'>,
  formData: FormData
) {
  const sessionId = await getSessionId();
  let newNote;
  try {
    newNote = await addNoteController(formData, sessionId, username);
  } catch (e) {
    return {
      error: 'Something went wrong',
    };
  }

  revalidatePath('/users/' + username + '/notes');
  redirect('/users/' + username + '/notes/' + newNote.id);
}

async function deleteNoteAction(
  { noteId, username }: AdditionalProps,
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

      revalidatePath('/users/' + username + '/notes');
      redirect('/users/' + username + '/notes');
    default:
      console.error('Invalid intent');
      break;
  }
}

export { editNoteAction, deleteNoteAction, addNoteAction };
