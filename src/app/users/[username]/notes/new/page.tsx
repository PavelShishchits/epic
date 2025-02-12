import NoteEditForm from '@/app/_components/NoteEditForm/NoteEditForm';

export async function generateMetadata({ params }: NewNotePageProps) {
  const { username } = await params;

  return {
    title: `Add new note from ${username}`,
    description: 'Add new note',
  };
}

interface NewNotePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function NewNotePage({ params }: NewNotePageProps) {
  const { username } = await params;
  return (
    <div>
      <NoteEditForm username={username} />
    </div>
  );
}
