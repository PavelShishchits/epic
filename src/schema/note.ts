import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB

export const imageFieldSchema = z.object({
  id: z.string().optional(),
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (value) => {
        // Skip validation if no file is uploaded
        if (!value || value?.size === 0 || value?.name === 'undefined')
          return true;
        // Check file size
        return value.size < MAX_FILE_SIZE;
      },
      {
        message: 'File must be less than 3MB',
      }
    )
    .refine(
      (value) => {
        // Skip validation if no file is uploaded
        if (!value || value?.size === 0 || value?.name === 'undefined')
          return true;
        // Check file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return validTypes.includes(value.type);
      },
      {
        message: 'File must be an image (JPEG, PNG)',
      }
    ),
  altText: z.string().optional(),
});

export type ImageConfig = z.infer<typeof imageFieldSchema>;

export const noteEditSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  images: z.array(imageFieldSchema),
});

export const convertedImageSchema = z.object({
  id: z.string().optional(),
  altText: z.string().optional(),
  contentType: z.string().optional(),
  blob: z.instanceof(Buffer).optional(),
});

const updateImageSchema = z.object({
  id: z.string(),
  altText: z.string(),
  contentType: z.string().optional(),
  blob: z.instanceof(Buffer).optional(),
});

const newImageSchema = z.object({
  altText: z.string(),
  contentType: z.string(),
  blob: z.instanceof(Buffer),
});

export const noteUpdateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  updatedImages: z.array(updateImageSchema),
  newImages: z.array(newImageSchema),
});

export const noteCreateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  images: z.array(newImageSchema),
});

export type NoteEditSchema = z.infer<typeof noteEditSchema>;

export type NoteCreateSchema = z.infer<typeof noteCreateSchema>;

export type NoteUpdateSchema = z.infer<typeof noteUpdateSchema>;
