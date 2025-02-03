import { getUserUseCase } from '@/application/use-cases/user/get-user.use-case';
import { User } from '@/entities/models/user';

function presenter(user: User) {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    image: user.image,
    notes: user.notes,
    createdAt: user.createdAt,
  };
}

export async function getUserController(
  username: string
): Promise<ReturnType<typeof presenter>> {
  const user = await getUserUseCase(username);

  return presenter(user);
}
