import { getNoteUseCase } from '@/application/use-cases/note/get-note.use-case';
import { Note } from '@/entities/models/note';

function presenter(note: Note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    ownerId: note.ownerId,
    images: note.images?.map((image) => ({
      id: image.id,
      altText: image.altText,
    })),
  };
}

export async function getNoteController(
  id: string
): Promise<ReturnType<typeof presenter>> {
  const note = await getNoteUseCase(id);

  return presenter(note);
}
