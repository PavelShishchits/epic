import NextImage from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import { getNoteCached } from '@/app/_cached/get-note.cached';
import NoteDeleteForm from '@/app/_components/NoteDeleteForm/NoteDeleteForm';
import Button from '@/app/_components/ui/Button/Button';
import Typography from '@/app/_components/ui/Typography/Typography';
import { getNoteImageSrc } from '@/app/_utils/misc';

interface NoteDetailsProps {
  noteId: string;
  userId: string;
  userName: string;
}

async function NoteDetails(props: NoteDetailsProps) {
  const { noteId, userName, userId } = props;

  const note = await getNoteCached(noteId);

  if (!note || !userName) {
    return notFound();
  }

  const authenticatedUser = await getAuthenticatedUserCached();

  const isAuthenticatedUser = userId === authenticatedUser?.id;

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
      {isAuthenticatedUser ? (
        <div className="mt-auto pt-4">
          <div className="flex justify-end gap-3">
            <NoteDeleteForm noteId={noteId} userName={userName} />
            <Button asChild variant="default">
              <Link href={`/users/${userName}/notes/${note.id}/edit`}>
                Edit
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export default NoteDetails;
