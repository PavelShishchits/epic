'use client';

import { toast } from 'sonner';

import { deleteNoteAction } from '@/app/_actions/notes.action';
import { CsrfTokenField, SubmitBtn } from '@/app/_components/ui/Form/';

type NoteDeleteFormProps = {
  noteId: string;
  userId: string;
};

function NoteDeleteForm(props: NoteDeleteFormProps) {
  const { noteId, userId } = props;

  const boundDeleteNoteAction = deleteNoteAction.bind(null, {
    noteId: noteId,
    userId: userId,
  });

  const handeFormSubmit = async (formData: FormData) => {
    const response = await boundDeleteNoteAction(formData);
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <form action={handeFormSubmit}>
      <CsrfTokenField />
      <input type="hidden" name="noteId" defaultValue={noteId} />
      <SubmitBtn variant="destructive" name="intent" value="delete">
        Delete
      </SubmitBtn>
    </form>
  );
}

export default NoteDeleteForm;
