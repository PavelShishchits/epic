interface NotesDetilsPageProps {
  params?: {
    id?: string;
  };
}

export default function NotesDetilsPage({ params }: NotesDetilsPageProps) {
  return <div>Notes Page {params?.id}</div>;
}
