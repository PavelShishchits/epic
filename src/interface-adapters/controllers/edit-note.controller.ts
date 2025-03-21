import { parseWithZod } from '@conform-to/zod';

import { editNoteUseCase } from '@/application/use-cases/note/edit-note.use-case';
import { InputParseError } from '@/entities/errors';
import { Note } from '@/entities/models/note';
import { noteEditSchema } from '@/schema/note';

function presenter(note: Note) {
  // convert to UI friendly format
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    ownerId: note.ownerId,
  };
}

export async function editNoteController(
  input: any,
  id: Note['id']
): Promise<ReturnType<typeof presenter>> {
  const parsedResult = parseWithZod(input, {
    schema: noteEditSchema,
  });

  if (parsedResult.status !== 'success') {
    throw new InputParseError('Invalid data', { cause: parsedResult.error });
  }

  const note = await editNoteUseCase(id, parsedResult.value);

  return presenter(note);
}
