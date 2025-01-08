import type { NoteRepositoryInterface } from '@/application/repositories/note.repository.interface';
import { Note } from '@/entities/models/note';
import { NoteUpdateSchema } from '@/schema/note';
import { prisma } from '@/infrastructure/db/db.server';
import { DatabaseOperationError } from '@/entities/errors';

export class NotesRepository implements NoteRepositoryInterface {
  async updateNote(
    id: Note['id'],
    noteData: Partial<NoteUpdateSchema>
  ): Promise<Note> {
    const { title, content, updatedImages = [], newImages = [] } = noteData;

    const note = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        images: {
          deleteMany: {
            id: { notIn: updatedImages.map((image) => image.id!) },
          },
          updateMany: updatedImages.map((image) => ({
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

    if (!note) {
      throw new DatabaseOperationError(
        'Cannot update note, note does not exist'
      );
    }

    return note;
  }

  async deleteNote(id: Note['id']): Promise<Note> {
    const note = await prisma.note.delete({
      where: {
        id: id,
      },
    });

    if (!note) {
      throw new DatabaseOperationError(
        'Cannot delete note, note does not exist'
      );
    }

    return note;
  }
}
