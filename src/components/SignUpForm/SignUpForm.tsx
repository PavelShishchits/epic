'use client';
import { useFormState } from 'react-dom';
import { signUp } from '@/application/useCases/signUpUseCase';
import { userRegisterSchema } from '@/schema/user';
import { useForm, getFormProps, getInputProps } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

import {
  FormField,
  FormMessages,
  FormLabel,
  Input,
  HoneypotField,
  CsrfTokenField,
} from '@/components/ui/Form/index';

import SubmitBtn from '@/components/SubmitBtn/SubmitBtn';

function SignUpForm() {
  const [state, formAction] = useFormState(signUp, undefined);

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
      <FormField>
        <CsrfTokenField />
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
