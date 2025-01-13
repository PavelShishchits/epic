import UserDetails from './_components/UserDetails/UserDetails';
import { Suspense } from 'react';
import type { ResolvingMetadata } from 'next';
import { getUserCached } from '@/app/_cached/get-user.cached';
import { UserRepository } from '@/infrastructure/repositories/users.repository';

export async function generateStaticParams() {
  const userRepository = new UserRepository();
  const users = await userRepository.getUsers({ username: true });

  return users.map((user) => ({ username: user.username }));
}

export async function generateMetadata(
  { params }: UserDetailPageProps,
  parent: ResolvingMetadata
) {
  const { username } = await params;

  const user = await getUserCached(username);

  if (!user) {
    return {
      title: 'User Not Found',
      description: 'The requested user does not exist.',
    };
  }

  return {
    title: user.name + ' Notes',
    description: user.email,
  };
}

interface UserDetailPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { username } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetails userName={username} />
    </Suspense>
  );
}
