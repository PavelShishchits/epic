import { z } from "zod";

export const noteEditSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (value) => {
        if (!value || value?.size === 0 || value?.name === "undefined")
          return true; // if no file is uploaded, we don't need to check the type
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        return validTypes.includes(value.type);
      },
      {
        message: "File must be an image (JPEG, PNG, GIF)",
      }
    ),
  altText: z.string().optional(),
});
