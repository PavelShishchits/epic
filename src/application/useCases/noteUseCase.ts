"use server";
import "server-only";
import { db, updateNote } from "@/infrastructure/db/db.server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { parseWithZod } from "@conform-to/zod";
import { delay } from "@/infrastructure/utils/delay";
import { noteEditSchema } from "@/schema/note";

type AdditionalProps = {
  noteId: string;
  userId: string;
};

export async function editNoteAction(
  { noteId, userId }: AdditionalProps,
  prevState: any,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: noteEditSchema,
  });

  console.log("submission", submission);
  if (submission.status !== "success") {
    return submission.reply();
  }

  const { title, content, image } = submission.value;

  await delay(2000);

  await updateNote({
    id: noteId,
    title,
    content,
    images: [image],
  });

  revalidatePath("/users/" + userId + "/notes/" + noteId);
  redirect("/users/" + userId + "/notes/" + noteId);
}

export async function deleteNoteAction(
  { noteId, userId }: AdditionalProps,
  formData: FormData
) {
  const intent = formData.get("intent")!;

  switch (intent) {
    case "delete":
      await db.note.delete({
        where: {
          id: {
            equals: noteId,
          },
        },
      });

      revalidatePath("/users/" + userId + "/notes");
      redirect("/users/" + userId + "/notes");
    default:
      console.error("Invalid intent");
      break;
  }
}
