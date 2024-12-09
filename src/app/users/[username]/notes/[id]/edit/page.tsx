import { Suspense } from 'react';
import NoteEdit from '@/components/NoteEdit/NoteEdit';
import { db } from '@/infrastructure/db/db.server';

export async function generateMetadata({ params }: NotesEditingPageProps) {
  const { id: noteId } = await params;

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
  params: {
    id: string;
    username: string;
  };
}

export default async function NotesEditingPage({
  params,
}: NotesEditingPageProps) {
  const { id: noteId, username: userId } = await params;

  return (
    <div className="p-6 border-2 border-blue-200 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteEdit noteId={noteId} userId={userId} />
      </Suspense>
    </div>
  );
}
