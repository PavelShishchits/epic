import { z } from 'zod';

const userSearchResultSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string().nullable(),
  imageId: z.string().nullable(),
  // image: z
  //   .object({
  //     id: z.string(),
  //   })
  //   .nullable(),
});

const userListSearchResultSchema = z.array(userSearchResultSchema);

type UserSearchResults = z.infer<typeof userListSearchResultSchema>;

export {
  userSearchResultSchema,
  userListSearchResultSchema,
  type UserSearchResults,
};
