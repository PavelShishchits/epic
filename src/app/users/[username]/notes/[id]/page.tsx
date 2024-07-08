import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { Suspense } from 'react';

interface NotesDetilsPageProps {
  params?: {
    id?: string;
  };
}

export default async function NotesDetilsPage({
  params,
}: NotesDetilsPageProps) {
  const noteId = params?.id || "";

  return (
    <div className="p-6 border-2 border-blue-200">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteDetails noteId={noteId} />
      </Suspense>
    </div>
  );
}
