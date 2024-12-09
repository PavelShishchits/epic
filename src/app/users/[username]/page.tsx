import UserDetails from '@/components/UserDetails/UserDetails';
import { Suspense } from 'react';
import { db } from '@/infrastructure/db/db.server';
import type { ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: UserDetailPageProps,
  parent: ResolvingMetadata
) {
  const { username } = await params;

  const user = await db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
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
    <div className="py-6 border-2 border-orange-400">
      <Suspense fallback={<div>Loading...</div>}>
        <UserDetails userName={username} />
      </Suspense>
    </div>
  );
}
