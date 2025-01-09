import { Note } from '@/entities/models/note';
import { NoteUpdateSchema } from '@/schema/note';

export interface NoteRepositoryInterface {
  getNote(id: Note['id']): Promise<Note>;
  updateNote(
    id: Note['id'],
    noteData: Partial<NoteUpdateSchema>
  ): Promise<Note>;
  deleteNote(id: Note['id']): Promise<Note>;
}
