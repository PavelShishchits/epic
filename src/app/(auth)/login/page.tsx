import { Metadata } from 'next';

import { LoginForm } from '@/app/_components/LoginForm/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login',
};

export default async function LoginPage() {
  return (
    <div className="container flex flex-col items-center">
      <LoginForm />
    </div>
  );
}
