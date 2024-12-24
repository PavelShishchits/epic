import { prisma } from '@/infrastructure/db/db.server';
import { notFound } from 'next/navigation';
import NoteEditForm from '@/components/NoteEditForm/NoteEditForm';
import { getSerializableProps } from '@/infrastructure/utils/getSerializableProps';
import { Note } from '@/domain/note';

interface NoteEditProps {
  noteId: string;
  userId: string;
}

async function NoteEdit(props: NoteEditProps) {
  const { noteId, userId } = props;

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      images: {
        select: {
          id: true,
          altText: true,
        },
      },
    },
  });

  if (!note || !userId) {
    return notFound();
  }

  const serializedNote = getSerializableProps<Note>(note);

  return <NoteEditForm noteId={noteId} userId={userId} note={serializedNote} />;
}

export default NoteEdit;
