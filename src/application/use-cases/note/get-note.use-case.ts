import { NotesRepository } from '@/infrastructure/repositories/notes.repository';

export async function getNoteUseCase(id: string) {
  // toDo DI
  const notesRepository = new NotesRepository();
  const note = await notesRepository.getNote(id);

  return note;
}
