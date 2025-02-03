import { Metadata } from 'next';

import { LoginForm } from '@/app/_components/LoginForm/LoginForm';
import Typography from '@/app/_components/ui/Typography/Typography';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login',
};

export default async function LoginPage() {
  return (
    <div className="container">
      <Typography className="mb-3" variant={'h1'} tag="h1">
        Login
      </Typography>
      <LoginForm />
    </div>
  );
}
