import { logOutAction } from '@/app/_actions/auth.action';
import Button from '@/app/_components/ui/Button/Button';
import { CsrfTokenField, HoneypotField } from '@/app/_components/ui/Form';

interface LogoutFormProps {
  children: React.ReactNode;
}

export const LogoutForm = ({ children }: LogoutFormProps) => {
  return (
    <form action={logOutAction}>
      <HoneypotField />
      <CsrfTokenField />
      {children}
    </form>
  );
};
