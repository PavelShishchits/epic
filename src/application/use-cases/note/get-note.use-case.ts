import { NotFoundError } from '@/entities/errors';
import { NotesRepository } from '@/infrastructure/repositories/notes.repository';

export async function getNoteUseCase(id: string) {
  // toDo DI
  const notesRepository = new NotesRepository();
  const note = await notesRepository.getNote(id);

  if (!note) {
    throw new NotFoundError('Note doesn not exist');
  }
  return note;
}
