import NoteEditForm from '@/components/NoteEditForm/NoteEditForm';
import { getSerializableProps } from '@/infrastructure/utils/getSerializableProps';
import { Note } from '@/domain/note';
import { getNoteCached } from '@/services/noteService/noteService';
import { notFound } from 'next/navigation';

interface NoteEditProps {
  noteId: string;
  userId: string;
}

async function NoteEdit(props: NoteEditProps) {
  const { noteId, userId } = props;

  const note = await getNoteCached({ noteId });

  if (!note) return notFound();

  const serializedNote = getSerializableProps<Note>(note);

  return <NoteEditForm noteId={noteId} userId={userId} note={serializedNote} />;
}

export default NoteEdit;
