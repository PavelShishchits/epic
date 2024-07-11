import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";
import { deleteNoteAction } from '@/actions/noteActions';

type NoteDeleteFormProps = {
  noteId: string;
  userId: string;
}

function NoteDeleteForm(props: NoteDeleteFormProps) {
  const { noteId, userId } = props;

  const boundDeleteNoteAction = deleteNoteAction.bind(null, {
    noteId: noteId,
    userId: userId,
  });

  return (
    <form action={boundDeleteNoteAction}>
      <input type="hidden" name="noteId" defaultValue={noteId} />
      <SubmitBtn name="intent" value="delete">Delete</SubmitBtn>
    </form>
  )
}

export default NoteDeleteForm;