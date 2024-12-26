import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { prisma } from '@/infrastructure/db/db.server';
import { Suspense } from 'react';

export async function generateMetadata({ params }: NotesDetilsPageProps) {
  const { id: noteId } = await params;

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: { title: true, content: true },
  });

  if (!note) return;

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
