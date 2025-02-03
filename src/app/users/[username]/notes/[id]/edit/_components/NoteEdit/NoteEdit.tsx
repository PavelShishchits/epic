import { notFound } from 'next/navigation';

import { getNoteCached } from '@/app/_cached/get-note.cached';
import NoteEditForm from '@/app/_components/NoteEditForm/NoteEditForm';
import { getSerializableProps } from '@/app/_utils/getSerializableProps';
import { Note } from '@/entities/models/note';

interface NoteEditProps {
  noteId: string;
  userId: string;
}

async function NoteEdit(props: NoteEditProps) {
  const { noteId, userId } = props;

  const note = await getNoteCached(noteId);

  if (!note) return notFound();

  const serializedNote = getSerializableProps<Note>(note);

  return <NoteEditForm noteId={noteId} userId={userId} note={serializedNote} />;
}

export default NoteEdit;
