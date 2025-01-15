import { Note } from '@/entities/models/note';
import { NotesRepository } from '@/infrastructure/repositories/notes.repository';
import { ImageConfig, NoteEditSchema } from '@/schema/note';

const imageHasFile = (image: ImageConfig) => {
  return Boolean(image.file && image.file.size > 0);
};

const imageHasId = (image: ImageConfig) => {
  // to check if image already exists in the database
  return Boolean(image.id);
};

export async function editNoteUseCase(id: Note['id'], data: NoteEditSchema) {
  const { title, content, images } = data;
  console.log('editNoteUseCase', data);

  const updatedImages = await Promise.all(
    images.filter(imageHasId).map(async (image) => {
      return {
        id: image.id!,
        altText: image.altText || '',
        ...(imageHasFile(image)
          ? {
              contentType: image.file!.type,
              blob: Buffer.from(await image.file!.arrayBuffer()),
            }
          : {}),
      };
    })
  );

  const newImages = await Promise.all(
    images
      .filter((image) => !image.id)
      .filter(imageHasFile)
      .map(async (image) => {
        const imageFile = image.file!;
        return {
          altText: image.altText || '',
          contentType: imageFile.type,
          blob: Buffer.from(await imageFile.arrayBuffer()),
        };
      })
  );

  // toDo DI
  const notesRepository = new NotesRepository();
  const note = await notesRepository.updateNote(id, {
    title,
    content,
    updatedImages,
    newImages,
  });

  return note;
}
