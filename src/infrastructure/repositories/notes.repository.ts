import type { NoteRepositoryInterface } from '@/application/repositories/note.repository.interface';
import { DatabaseOperationError } from '@/entities/errors';
import { Note } from '@/entities/models/note';
import { prisma } from '@/infrastructure/db/db.server';
import { NoteCreateSchema, NoteUpdateSchema } from '@/schema/note';

export class NotesRepository implements NoteRepositoryInterface {
  async getNote(id: Note['id']): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
      },
    });

    return note;
  }

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

  async addNote(noteData: NoteCreateSchema, userId: string): Promise<Note> {
    const note = await prisma.note.create({
      data: {
        title: noteData.title,
        content: noteData.content,
        ownerId: userId,
        images: {
          create: noteData.images || [],
        },
      },
      include: {
        images: true,
      },
    });

    if (!note) {
      throw new DatabaseOperationError('Cannot create note');
    }

    return note;
  }
}
