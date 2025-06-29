'use client';

import Link from 'next/link';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { toast } from 'sonner';

import { signInAction } from '@/app/_actions/auth.action';
import {
  Checkbox,
  CsrfTokenField,
  FormField,
  FormLabel,
  FormMessages,
  HoneypotField,
  Input,
  SubmitBtn,
} from '@/app/_components/ui/Form';
import { userLoginSchema } from '@/schema/user';

type LoginFormProps = {};

const LoginForm = (props: LoginFormProps) => {
  // const [state, formAction] = useActionState(login, undefined);

  const [form, fields] = useForm({
    id: 'login-form',
    constraint: getZodConstraint(userLoginSchema),
    // lastResult: state,
    onValidate(context) {
      return parseWithZod(context.formData, {
        schema: userLoginSchema,
      });
    },
    defaultValue: {
      username: '',
      password: '',
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  });

  const usernameProps = getInputProps(fields.username, { type: 'text' });

  const passwordProps = getInputProps(fields.password, { type: 'password' });

  const rememberMeProps = getInputProps(fields.rememberMe, {
    type: 'checkbox',
  });

  const handleFormSubmitAction = async (formData: FormData) => {
    const response = await signInAction(formData);
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <form action={handleFormSubmitAction} {...getFormProps(form)}>
      <CsrfTokenField />
      <HoneypotField />
      <FormField>
        <FormLabel htmlFor={fields.username.id}>Username</FormLabel>
        <Input {...usernameProps} />
        <FormMessages
          errors={fields.username.errors}
          id={fields.username.errorId}
        />
      </FormField>
      <FormField>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor={fields.password.id}>Password</FormLabel>
          <Link href="/" className="text-sm hover:underline underline-offset-4">
            Forgot your password?
          </Link>
        </div>
        <Input {...passwordProps} />
        <FormMessages
          errors={fields.password.errors}
          id={fields.password.errorId}
        />
      </FormField>

      <FormField>
        <div className="flex items-center gap-2">
          <Checkbox {...rememberMeProps} />
          <FormLabel htmlFor={fields.rememberMe.id}>Remember me</FormLabel>
        </div>
        <FormMessages
          errors={fields.rememberMe.errors}
          id={fields.rememberMe.errorId}
        />
      </FormField>

      <SubmitBtn className="w-full" variant={'default'}>
        Login
      </SubmitBtn>
    </form>
  );
};

export { LoginForm };
