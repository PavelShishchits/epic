'use server';
import 'server-only';
import { prisma } from '@/infrastructure/db/db.server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { parseWithZod } from '@conform-to/zod';
import { noteEditSchema, ImageConfig } from '@/schema/note';
import { HoneyPot } from '@/lib/honeypot.server';

type AdditionalProps = {
  noteId: string;
  userId: string;
};

export async function editNoteAction(
  { noteId, userId }: AdditionalProps,
  prevState: any,
  formData: FormData
) {
  new HoneyPot().check(formData);

  const imageHasFile = (image: ImageConfig) => {
    return Boolean(image.file && image.file.size > 0);
  };

  const imageHasId = (image: ImageConfig) => {
    // to check if image already exists in the database
    return Boolean(image.id);
  };

  const submission = await parseWithZod(formData, {
    schema: noteEditSchema.transform(async ({ images = [], ...data }) => {
      return {
        ...data,
        imageUpdates: await Promise.all(
          images.filter(imageHasId).map(async (image) => {
            return {
              id: image.id!,
              altText: image.altText,
              ...(imageHasFile(image)
                ? {
                    contentType: image.file!.type,
                    blob: Buffer.from(await image.file!.arrayBuffer()),
                  }
                : {}),
            };
          })
        ),
        newImages: await Promise.all(
          images
            .filter(imageHasFile)
            .filter((image) => !image.id)
            .map(async (image) => {
              return {
                altText: image.altText || '',
                contentType: image.file!.type,
                blob: Buffer.from(await image.file!.arrayBuffer()),
              };
            })
        ),
      };
    }),
    async: true,
  });

  console.log('submission', submission);
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const {
    title,
    content,
    imageUpdates = [],
    newImages = [],
  } = submission.value;

  await prisma.note.update({
    select: { id: true },
    where: {
      id: noteId,
    },
    data: {
      title,
      content,
      images: {
        deleteMany: { id: { notIn: imageUpdates.map((image) => image.id) } },
        updateMany: imageUpdates.map((image) => ({
          where: { id: image.id },
          data: {
            altText: image.altText,
            ...(image.blob
              ? { blob: image.blob, contentType: image.contentType }
              : {}),
          },
        })),
        create: newImages,
      },
    },
  });

  revalidatePath('/users/' + userId + '/notes/' + noteId);
  redirect('/users/' + userId + '/notes/' + noteId);
}

export async function deleteNoteAction(
  { noteId, userId }: AdditionalProps,
  formData: FormData
) {
  const intent = formData.get('intent')!;

  switch (intent) {
    case 'delete':
      await prisma.note.delete({
        where: {
          id: noteId,
        },
      });

      revalidatePath('/users/' + userId + '/notes');
      redirect('/users/' + userId + '/notes');
    default:
      console.error('Invalid intent');
      break;
  }
}
