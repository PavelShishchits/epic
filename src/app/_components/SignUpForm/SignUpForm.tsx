'use client';

import { useActionState } from 'react';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

import { signUpAction } from '@/app/_actions/auth.action';
import {
  CsrfTokenField,
  FormField,
  FormLabel,
  FormMessages,
  HoneypotField,
  Input,
  SubmitBtn,
} from '@/app/_components/ui/Form/index';
import { userRegisterSchema } from '@/schema/user';

function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, undefined);

  const [form, fields] = useForm({
    id: 'sign-up-form',
    constraint: getZodConstraint(userRegisterSchema),
    lastResult: state,
    onValidate(context) {
      return parseWithZod(context.formData, {
        schema: userRegisterSchema,
      });
    },
    defaultValue: {
      email: '',
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  });

  const { key: emailKey, ...emailProps } = getInputProps(fields.email, {
    type: 'email',
  });

  return (
    <form action={formAction} {...getFormProps(form)}>
      <CsrfTokenField />
      <FormField>
        <FormLabel htmlFor={fields.email.id}>Email</FormLabel>
        <Input {...emailProps} />
        <FormMessages
          errors={fields.email.errors}
          id={fields.email.errorId}
        ></FormMessages>
      </FormField>
      <HoneypotField />
      <SubmitBtn variant="default">Sign up</SubmitBtn>
    </form>
  );
}

export default SignUpForm;
