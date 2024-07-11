// import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { Suspense } from 'react';
import NoteEdit from '@/components/NoteEdit/NoteEdit';

interface NotesEditingPageProps {
  params?: {
    id?: string;
    username?: string;
  };
}

export default async function NotesEditingPage({
  params,
}: NotesEditingPageProps) {
  const noteId = params?.id || "";
  const userId = params?.username || "";

  return (
    <div className="p-6 border-2 border-blue-200 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NoteEdit noteId={noteId} userId={userId} />
      </Suspense>
    </div>
  );
}
