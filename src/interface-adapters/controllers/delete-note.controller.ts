import { Note } from '@/entities/models/note';
import { deleteNoteUseCase } from '@/application/use-cases/note/delete-note.use-case';

function presenter(note: Note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    ownerId: note.ownerId,
  };
}

export async function deleteNoteController(
  id: Note['id']
): Promise<ReturnType<typeof presenter>> {
  const note = await deleteNoteUseCase(id);

  return presenter(note);
}
