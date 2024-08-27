"use server";
import { db } from "@/utils/db.server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { delay } from "@/utils/delay";

const noteEditSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
});

type State = {
  errors?: {
    title?: string[];
    content?: string[];
  };
};

type AdditionalProps = {
  noteId: string;
  userId: string;
};

export async function editNoteAction(
  { noteId, userId }: AdditionalProps,
  prevState: State,
  formData: FormData
) {
  const validatedFields = noteEditSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, content } = validatedFields.data;

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
