import type { Metadata } from 'next';
import { Suspense } from 'react';
import UserList from '@/components/UserList/UserList';

export const metadata: Metadata = {
  title: 'Users',
  description: 'A note taking app',
};

export default function UsersPage() {
  return (
    <div>
      <h1 className="mb-4">Users Page</h1>
      <Suspense fallback={'Loading...'}>
        <UserList />
      </Suspense>
    </div>
  );
}
