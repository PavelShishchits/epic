import UserDetails from '@/components/UserDetails/UserDetails';
import { Suspense } from 'react';
import { prisma } from '@/infrastructure/db/db.server';
import type { ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: UserDetailPageProps,
  parent: ResolvingMetadata
) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      name: true,
      email: true,
    },
  });

  if (!user) return;

  return {
    title: user.name + ' Notes',
    description: user.email,
  };
}

interface UserDetailPageProps {
  params: {
    username: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { username } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetails userName={username} />
    </Suspense>
  );
}
