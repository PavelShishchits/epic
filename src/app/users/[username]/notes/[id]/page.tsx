import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getNoteCached } from '@/app/_cached/get-note.cached';
import { getUserCached } from '@/app/_cached/get-user.cached';
import { prisma } from '@/infrastructure/db/db.server';

import NoteDetails from './_components/NoteDetails/NoteDetails';

export const generateStaticParams = async () => {
  // toDo fetch via repository
  const notes = await prisma.note.findMany({
    select: {
      id: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
  });

  return notes.map((note) => ({
    id: note.id,
    username: note.owner.username,
  }));
};

export async function generateMetadata({ params }: NotesDetilsPageProps) {
  const { id: noteId } = await params;

  const note = await getNoteCached(noteId);

  if (!note) {
    return {
      title: 'Note not found',
      description: 'Note not found',
    };
  }

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
  const { id: noteId, username } = await params;

  const user = await getUserCached(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="p-6 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteDetails noteId={noteId} userName={username} userId={user.id} />
      </Suspense>
    </div>
  );
}
