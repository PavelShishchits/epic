import NoteDetails from './_components/NoteDetails/NoteDetails';
import { prisma } from '@/infrastructure/db/db.server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { cache } from 'react';

// toDo move to note service
export const getNote = cache(async ({ noteId }: { noteId: string }) => {
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

  if (!note) return notFound();

  return note;
});

export async function generateMetadata({ params }: NotesDetilsPageProps) {
  const { id: noteId } = await params;

  const note = await getNote({ noteId });

  return {
    title: note.title,
    description: note.content.substring(0, 100) + '...',
  };
}

interface NotesDetilsPageProps {
  params: Promise<{
    id: string;
    username: string;
  }>;
}

export default async function NotesDetilsPage({
  params,
}: NotesDetilsPageProps) {
  const { id: noteId, username: userId } = await params;

  return (
    <div className="p-6 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteDetails noteId={noteId} userId={userId} />
      </Suspense>
    </div>
  );
}
