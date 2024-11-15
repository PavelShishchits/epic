import { Suspense } from 'react';
import NoteEdit from '@/components/NoteEdit/NoteEdit';
import { db } from '@/infrastructure/db/db.server';

export async function generateMetadata({ params }: NotesEditingPageProps) {
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

interface NotesEditingPageProps {
  params?: {
    id?: string;
    username?: string;
  };
}

export default async function NotesEditingPage({
  params,
}: NotesEditingPageProps) {
  const noteId = params?.id || '';
  const userId = params?.username || '';

  return (
    <div className="p-6 border-2 border-blue-200 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteEdit noteId={noteId} userId={userId} />
      </Suspense>
    </div>
  );
}
