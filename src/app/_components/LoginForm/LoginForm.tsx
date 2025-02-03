'use client';

import { useActionState } from 'react';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { toast } from 'sonner';

import { signInAction } from '@/app/_actions/auth.action';
import {
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

  const { key: usernameKey, ...usernameProps } = getInputProps(
    fields.username,
    { type: 'text' }
  );

  const { key: passwordKey, ...passwordProps } = getInputProps(
    fields.password,
    { type: 'password' }
  );

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
        <FormLabel htmlFor={fields.password.id}>Password</FormLabel>
        <Input {...passwordProps} />
        <FormMessages
          errors={fields.password.errors}
          id={fields.password.errorId}
        />
      </FormField>
      <SubmitBtn variant={'default'}>Login</SubmitBtn>
    </form>
  );
};

export { LoginForm };
