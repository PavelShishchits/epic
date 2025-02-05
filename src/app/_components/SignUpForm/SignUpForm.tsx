'use client';

import { useActionState, useEffect } from 'react';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { toast } from 'sonner';

import { signUpAction } from '@/app/_actions/auth.action';
import {
  Checkbox,
  CsrfTokenField,
  FormField,
  FormLabel,
  FormMessages,
  HoneypotField,
  Input,
  SubmitBtn,
} from '@/app/_components/ui/Form/index';
import { userRegisterSchema } from '@/schema/user';

export function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, undefined);

  const [form, fields] = useForm({
    id: 'sign-up-form',
    constraint: getZodConstraint(userRegisterSchema),
    // lastResult: state,
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

  useEffect(() => {
    if (state && 'toastError' in state) {
      toast.error(state.toastError);
    }
  }, [state]);

  const { key: emailKey, ...emailProps } = getInputProps(fields.email, {
    type: 'email',
  });
  const { key: usernameKey, ...usernameProps } = getInputProps(
    fields.username,
    {
      type: 'text',
    }
  );
  const { key: nameKey, ...nameProps } = getInputProps(fields.name, {
    type: 'text',
  });
  const { key: passwordKey, ...passwordProps } = getInputProps(
    fields.password,
    {
      type: 'password',
    }
  );
  const { key: confirmPasswordKey, ...confirmPasswordProps } = getInputProps(
    fields.confirmPassword,
    {
      type: 'password',
    }
  );
  // const { key: termsKey, ...termsProps } = getInputProps(fields.terms, {
  //   type: 'checkbox',
  // });

  return (
    <form className="w-full" action={formAction} {...getFormProps(form)}>
      <CsrfTokenField />
      <HoneypotField />

      <FormField>
        <FormLabel htmlFor={fields.email.id}>Email</FormLabel>
        <Input {...emailProps} />
        <FormMessages
          errors={fields.email.errors}
          id={fields.email.errorId}
        ></FormMessages>
      </FormField>

      <FormField>
        <FormLabel htmlFor={fields.username.id}>Username</FormLabel>
        <Input {...usernameProps} />
        <FormMessages
          errors={fields.username.errors}
          id={fields.username.errorId}
        ></FormMessages>
      </FormField>

      <FormField>
        <FormLabel htmlFor={fields.name.id}>Name</FormLabel>
        <Input {...nameProps} />
        <FormMessages
          errors={fields.name.errors}
          id={fields.name.errorId}
        ></FormMessages>
      </FormField>

      <FormField>
        <FormLabel htmlFor={fields.password.id}>Password</FormLabel>
        <Input {...passwordProps} />
        <FormMessages
          errors={fields.password.errors}
          id={fields.password.errorId}
        ></FormMessages>
      </FormField>

      <FormField>
        <FormLabel htmlFor={fields.confirmPassword.id}>
          Confirm password
        </FormLabel>
        <Input {...confirmPasswordProps} />
        <FormMessages
          errors={fields.confirmPassword.errors}
          id={fields.confirmPassword.errorId}
        ></FormMessages>
      </FormField>

      {/* <FormField>
        <div className="flex items-center gap-2">
          <Checkbox
            {...termsProps}
          />
          <FormLabel htmlFor={fields.terms.id}>
            Accept terms and conditions
          </FormLabel>
        </div>
        <FormMessages
          errors={fields.terms.errors}
          id={fields.terms.errorId}
        ></FormMessages>
      </FormField> */}

      <SubmitBtn className="w-full" variant="default">
        Create account
      </SubmitBtn>
    </form>
  );
}
