import { getUsersOrderedByLatestChangesUseCase } from '@/application/use-cases/user/get-users-ordered-by-latest-changes.use-case';

export async function getUsersOrderedByLatestChangesController(query?: string) {
  const users = await getUsersOrderedByLatestChangesUseCase(query);

  return users;
}
