import { parseWithZod } from '@conform-to/zod';

import { addNoteUseCase } from '@/application/use-cases/note/add-note.user-case';
import { InputParseError, UnauthenticatedError } from '@/entities/errors';
import { Note } from '@/entities/models/note';
import { AuthentificationService } from '@/infrastructure/services/authentication.service';
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

export async function addNoteController(
  input: any,
  sessionId: string | undefined,
  username: string
): Promise<ReturnType<typeof presenter>> {
  if (!sessionId) {
    throw new UnauthenticatedError('Unauthenticated');
  }

  const authenticationService = new AuthentificationService();

  const { userId } = await authenticationService.validateSession(sessionId);

  const parsedResult = await parseWithZod(input, {
    schema: noteEditSchema,
  });

  if (parsedResult.status !== 'success') {
    throw new InputParseError('Invalid data', { cause: parsedResult.error });
  }

  const note = await addNoteUseCase(parsedResult.value, userId, username);

  return presenter(note);
}
