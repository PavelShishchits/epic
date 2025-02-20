import { logOutAction } from '@/app/_actions/auth.action';
import { CsrfTokenField, HoneypotField } from '@/app/_components/ui/Form';

interface LogoutFormProps {
  children: React.ReactNode;
  className?: string;
}

export const LogoutForm = ({ children, ...props }: LogoutFormProps) => {
  const handleAction = async (formData: FormData) => {
    'use server';
    await logOutAction(formData);
  };

  return (
    <form action={handleAction} {...props}>
      <HoneypotField />
      <CsrfTokenField />
      {children}
    </form>
  );
};
