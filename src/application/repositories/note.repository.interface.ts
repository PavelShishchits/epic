import { Note } from '@/entities/models/note';
import { NoteCreateSchema, NoteUpdateSchema } from '@/schema/note';

export interface NoteRepositoryInterface {
  getNote(id: Note['id']): Promise<Note | null>;
  updateNote(
    id: Note['id'],
    noteData: Partial<NoteUpdateSchema>
  ): Promise<Note>;
  deleteNote(id: Note['id']): Promise<Note>;
  addNote(notedData: Partial<NoteCreateSchema>, userId: string): Promise<Note>;
}
