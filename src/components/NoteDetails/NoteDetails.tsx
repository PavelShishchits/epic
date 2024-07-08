import { db } from "@/utils/db.server";
import Typography from "@/components/Typography/Typography";

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
      <Typography variant="h1" tag="h1">
        {note.title}
      </Typography>
      <p>{note.content}</p>
    </article>
  );
}

export default NoteDetails;
