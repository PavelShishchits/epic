import UserDetails from "@/components/UserDetails/UserDetails";
import { Suspense } from "react";
import { db } from "@/utils/db.server";
import type { ResolvingMetadata } from "next";

export async function generateMetadata({ params }: UserDetailPageProps, parent: ResolvingMetadata) {
  const userName = params?.username || "";

  const user = await db.user.findFirst({
    where: {
      username: {
        equals: userName,
      },
    },
  });

  if (!user) return;

  return {
    title: user.name + " Notes",
    description: user.email,
  };
}

interface UserDetailPageProps {
  params?: {
    username?: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const userName = params?.username || "";

  return (
    <div className="py-6 border-2 border-orange-400">
      <Suspense fallback={<div>Loading...</div>}>
        <UserDetails userName={userName} />
      </Suspense>
    </div>
  );
}
