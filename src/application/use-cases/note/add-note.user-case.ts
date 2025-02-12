import { UnauthenticatedError } from '@/entities/errors';
import { NotesRepository } from '@/infrastructure/repositories/notes.repository';
import { UserRepository } from '@/infrastructure/repositories/users.repository';
import { ImageConfig, NoteEditSchema } from '@/schema/note';

const imageHasFile = (image: ImageConfig) => {
  return Boolean(image.file && image.file.size > 0);
};

export async function addNoteUseCase(
  data: NoteEditSchema,
  userId: string,
  username: string
) {
  const usersRepository = new UserRepository();
  const notesRepository = new NotesRepository();

  const user = await usersRepository.getUser(userId);
  if (!user) {
    throw new UnauthenticatedError("User doesn't exist");
  }

  const newImages = await Promise.all(
    data.images.filter(imageHasFile).map(async (image) => {
      const imageFile = image.file!;
      return {
        altText: image.altText || '',
        contentType: imageFile.type,
        blob: Buffer.from(await imageFile.arrayBuffer()),
      };
    })
  );

  const note = await notesRepository.addNote(
    {
      title: data.title,
      content: data.content,
      images: newImages,
    },
    user?.id
  );

  return note;
}
