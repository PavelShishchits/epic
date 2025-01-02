import { prisma } from '@/infrastructure/db/db.server';
import { cache } from 'react';

const getNote = async ({ noteId }: { noteId: string }) => {
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      images: {
        select: {
          id: true,
          altText: true,
        },
      },
    },
  });

  return note;
};

const getNoteCached = cache(getNote);

export { getNote, getNoteCached };
