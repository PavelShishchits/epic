import { deleteNoteAction } from '@/application/useCases/noteUseCase';
import { CsrfTokenField, SubmitBtn } from '@/components/ui/Form/';

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

  return (
    <form action={boundDeleteNoteAction}>
      <CsrfTokenField />
      <input type="hidden" name="noteId" defaultValue={noteId} />
      <SubmitBtn variant="destructive" name="intent" value="delete">
        Delete
      </SubmitBtn>
    </form>
  );
}

export default NoteDeleteForm;
