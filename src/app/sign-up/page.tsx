import type { Metadata } from 'next';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import Typography from '@/components/ui/Typography/Typography';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up',
};

export default async function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="p-5 w-1/2">
        <Typography variant="h1" tag="h1" className="mb-3">
          Sign up
        </Typography>
        <SignUpForm />
      </div>
    </div>
  );
}
