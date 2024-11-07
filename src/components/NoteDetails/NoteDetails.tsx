import { db } from "@/infrastructure/db/db.server";
import { notFound } from "next/navigation";
import Typography from "@/components/Typography/Typography";
import Link from "next/link";
import Image from "next/image";
import NoteDeleteForm from "@/components/NoteDeleteForm/NoteDeleteForm";

interface NoteDetailsProps {
  noteId: string;
  userId: string;
}

async function NoteDetails(props: NoteDetailsProps) {
  const { noteId, userId } = props;

  const note = await db.note.findFirst({
    where: {
      id: {
        equals: noteId,
      },
    },
  });

  if (!note || !userId) {     
    return notFound();
  };

  return (
    <article className="h-full flex flex-col">
      <div>
        <Typography variant="h1" tag="h1">
          {note.title}
        </Typography>
        <Typography variant="p" tag="p">{note.content}</Typography>
        {note.images.map((image) => (
          <Image key={image.id} src={image.filepath} alt={image.altText ?? ''} width={200} height={200} />
        ))} 
      </div>
      <div className="mt-auto pt-4">
        <div className="flex justify-end gap-4">
          <NoteDeleteForm noteId={noteId} userId={userId} />
          <Link href={`/users/${userId}/notes/${note.id}/edit`}>Edit</Link>
        </div>
      </div>
    </article>
  );
}

export default NoteDetails;
