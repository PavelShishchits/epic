"use client";
import { useFormState } from 'react-dom';
import { signUp } from '@/application/useCases/signUpUseCase';
import Button from "@/components/ui/Button/Button";
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";

function SignUpForm() {
  const [state, formAction] = useFormState(signUp, undefined);

  return (
    <form action={formAction}>
      <div className="mb-5">
        <label className="flex flex-col gap-2 mb-2">
          <span>Email</span>
          <input className="border-2 border-blue-200 py-3 px-4 rounded" type="email" name="email" />
        </label>
      </div>
      <div className="mb-5">
        <Button variant="default">Submit</Button>
      </div>
    </form>
  )
}

export default SignUpForm;