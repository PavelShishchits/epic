import { logOutAction } from '@/app/_actions/auth.action';
import Button from '@/app/_components/ui/Button/Button';
import { CsrfTokenField, HoneypotField } from '@/app/_components/ui/Form';

export const LogoutForm = () => {
  return (
    <form action={logOutAction}>
      <HoneypotField />
      <CsrfTokenField />
      <Button className="p-0 h-auto" variant={'link'}>
        Logout
      </Button>
    </form>
  );
};
