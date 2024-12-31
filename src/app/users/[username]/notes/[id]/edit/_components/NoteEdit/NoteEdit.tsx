import NoteEditForm from '@/components/NoteEditForm/NoteEditForm';
import { getSerializableProps } from '@/infrastructure/utils/getSerializableProps';
import { Note } from '@/domain/note';
import { getNote } from '../../../page';

interface NoteEditProps {
  noteId: string;
  userId: string;
}

async function NoteEdit(props: NoteEditProps) {
  const { noteId, userId } = props;

  const note = await getNote({ noteId });

  const serializedNote = getSerializableProps<Note>(note);

  return <NoteEditForm noteId={noteId} userId={userId} note={serializedNote} />;
}

export default NoteEdit;
