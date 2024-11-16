'use client';
import { useFormState } from 'react-dom';
import { signUp } from '@/application/useCases/signUpUseCase';
import {
  FormField,
  FormMessages,
  FormLabel,
  Input,
} from '@/components/ui/Form/index';

import SubmitBtn from '@/components/SubmitBtn/SubmitBtn';

function SignUpForm() {
  const [state, formAction] = useFormState(signUp, undefined);

  return (
    <form action={formAction}>
      <FormField>
        <FormLabel htmlFor="email-field-id">Email</FormLabel>
        <Input type="email" name="email" id="email-field-id" />
        {/* <FormMessages errors={[]} id=""></FormMessages> */}
      </FormField>
      <SubmitBtn variant="default">Sign up</SubmitBtn>
    </form>
  );
}

export default SignUpForm;
