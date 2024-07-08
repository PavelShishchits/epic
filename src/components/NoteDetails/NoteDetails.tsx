import { db } from "@/utils/db.server";
import { delay } from "@/utils/delay";

interface NoteDetailsProps {
  noteId: string;
}

async function NoteDetails({ noteId }: NoteDetailsProps) {

  const note = await db.note.findFirst({
    where: {
      id: {
        equals: noteId,
      },
    },
  });

  if (!note) return null;

  return (
    <article>
      <h1 className="text-h2">{note.title}</h1>
      <p>{note.content}</p>
    </article>
  );
}

export default NoteDetails;
