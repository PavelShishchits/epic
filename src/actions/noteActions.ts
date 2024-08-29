"use server";
import "server-only";
import { db } from "@/utils/db.server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { parseWithZod } from "@conform-to/zod";
import { delay } from "@/utils/delay";
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

  console.log(submission);
  if (submission.status !== "success") {
    console.log(submission.reply());
    return submission.reply();
  }

  const { title, content } = submission.value;

  await delay(2000);

  await db.note.update({
    where: {
      id: {
        equals: noteId,
      },
    },
    data: {
      title,
      content,
    },
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
