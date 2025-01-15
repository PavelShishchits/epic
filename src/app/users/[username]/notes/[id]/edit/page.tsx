import { Suspense } from 'react';

import { getNoteCached } from '@/app/_cached/get-note.cached';
import { prisma } from '@/infrastructure/db/db.server';

import NoteEdit from './_components/NoteEdit/NoteEdit';

export const generateStaticParams = async () => {
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

export async function generateMetadata({ params }: NotesEditingPageProps) {
  const { id: noteId } = await params;

  const note = await getNoteCached(noteId);

  if (!note) return;

  return {
    title: note.title,
    description: note.content.substring(0, 100) + '...',
  };
}

interface NotesEditingPageProps {
  params: Promise<{
    id: string;
    username: string;
  }>;
}

export default async function NotesEditingPage({
  params,
}: NotesEditingPageProps) {
  const { id: noteId, username: userId } = await params;

  return (
    <div className="p-6 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteEdit noteId={noteId} userId={userId} />
      </Suspense>
    </div>
  );
}
