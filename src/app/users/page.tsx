import type { Metadata } from 'next';
import { Suspense } from 'react';
import Typography from '@/components/ui/Typography/Typography';
import UserList from '@/components/UserList/UserList';
import UsersSearchForm from '@/components/UsersSearchForm/UsersSearchForm';
import { SEARCH_USERS_QUERY_PARAM } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Users',
  description: 'A note taking app',
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ query: typeof SEARCH_USERS_QUERY_PARAM }>;
}) {
  const usernameQuery = (await searchParams)[SEARCH_USERS_QUERY_PARAM];

  return (
    <div className="container flex flex-col items-center justify-center">
      <Typography variant={'h2'} tag="h1" className="mb-4">
        Users
      </Typography>
      <UsersSearchForm />
      <Suspense fallback={'Loading...'}>
        <UserList usernameQuery={usernameQuery} />
      </Suspense>
    </div>
  );
}
