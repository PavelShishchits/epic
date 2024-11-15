import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { db } from '@/infrastructure/db/db.server';
import { Suspense } from 'react';

export async function generateMetadata({ params }: NotesDetilsPageProps) {
  const noteId = params?.id || '';

  const note = await db.note.findFirst({
    where: {
      id: {
        equals: noteId,
      },
    },
  });

  if (!note) return;

  return {
    title: note.title,
    description: note.content.substring(0, 100),
  };
}

interface NotesDetilsPageProps {
  params?: {
    id?: string;
    username?: string;
  };
}

export default async function NotesDetilsPage({
  params,
}: NotesDetilsPageProps) {
  const noteId = params?.id || '';
  const userId = params?.username || '';

  return (
    <div className="p-6 border-2 border-blue-200 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteDetails noteId={noteId} userId={userId} />
      </Suspense>
    </div>
  );
}
