import { Note } from '@/entities/models/note';
import { NotesRepository } from '@/infrastructure/repositories/notes.repository';

export async function deleteNoteUseCase(id: Note['id']) {
  // toDo DI
  const notesRepository = new NotesRepository();
  const note = await notesRepository.deleteNote(id);

  return note;
}
