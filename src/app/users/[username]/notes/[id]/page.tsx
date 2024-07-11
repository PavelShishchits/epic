import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { Suspense } from 'react';

interface NotesDetilsPageProps {
  params?: {
    id?: string;
    username?: string;
  };
}

export default async function NotesDetilsPage({
  params,
}: NotesDetilsPageProps) {
  const noteId = params?.id || "";
  const userId = params?.username || "";

  return (
    <div className="p-6 border-2 border-blue-200 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteDetails noteId={noteId} userId={userId} />
      </Suspense>
    </div>
  );
}
