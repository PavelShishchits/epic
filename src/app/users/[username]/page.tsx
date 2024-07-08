import UserDetails from "@/components/UserDetails/UserDetails";
import { Suspense } from "react";

interface UserDetailPageProps {
  params?: {
    username?: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const userName = params?.username || '';

  return (
    <div className="py-6 border-2 border-orange-400">
      <Suspense fallback={<div>Loading...</div>}>
        <UserDetails userName={userName} />
      </Suspense>
    </div>
  );
}
