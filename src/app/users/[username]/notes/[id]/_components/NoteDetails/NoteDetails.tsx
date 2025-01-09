import { notFound } from 'next/navigation';
import Typography from '@/app/_components/ui/Typography/Typography';
import Link from 'next/link';
import NextImage from 'next/image';
import NoteDeleteForm from '@/app/_components/NoteDeleteForm/NoteDeleteForm';
import Button from '@/app/_components/ui/Button/Button';
import { getNoteImageSrc } from '@/utils/misc';
import { getNoteCached } from '@/app/_cached/get-note.cached';

interface NoteDetailsProps {
  noteId: string;
  userId: string;
}

async function NoteDetails(props: NoteDetailsProps) {
  const { noteId, userId } = props;

  const note = await getNoteCached(noteId);

  if (!note || !userId) {
    return notFound();
  }

  return (
    <article className="h-full flex flex-col">
      <div>
        <Typography variant="h1" tag="h1">
          {note.title}
        </Typography>
        <Typography variant="p" tag="p">
          {note.content}
        </Typography>
        {note.images && note.images.length > 0 ? (
          <div className="flex items-center gap-3 mt-6">
            {note.images.map((image) => (
              <NextImage
                key={image.id}
                src={getNoteImageSrc(image.id)}
                alt={image.altText}
                width={150}
                height={150}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-auto pt-4">
        <div className="flex justify-end gap-3">
          <NoteDeleteForm noteId={noteId} userId={userId} />
          <Button asChild variant="default">
            <Link href={`/users/${userId}/notes/${note.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default NoteDetails;
