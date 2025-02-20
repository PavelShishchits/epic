'use client';

import { useForm } from '@conform-to/react';
import { getFormProps, getInputProps } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

import {
  CsrfTokenField,
  FormField,
  FormLabel,
  FormMessages,
  HoneypotField,
  Input,
  InputFileWithPreview,
  SubmitBtn,
} from '@/app/_components/ui/Form';
import { getUserImageSrc } from '@/app/_utils/misc';
import { editUserProfileSchema } from '@/schema/user';

type ChangeProfileFormProps = {
  className?: string;
  user: {
    username: string;
    name: string | null;
    email: string;
    imageId?: string;
  };
};

const ChangeProfileForm = ({ user }: ChangeProfileFormProps) => {
  const [form, fields] = useForm({
    id: 'edit-profile',
    constraint: getZodConstraint(editUserProfileSchema),
    onValidate(context) {
      return parseWithZod(context.formData, {
        schema: editUserProfileSchema,
      });
    },
    defaultValue: {
      username: user.username,
      name: user.name,
      email: user.email,
      image: null,
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
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

  const { key: emailKey, ...emailProps } = getInputProps(fields.email, {
    type: 'email',
  });

  const { key: imageKey, ...imageProps } = getInputProps(fields.image, {
    type: 'file',
  });

  return (
    <form {...getFormProps(form)}>
      <CsrfTokenField />
      <HoneypotField />

      <InputFileWithPreview
        previewImageSrc={getUserImageSrc(user.imageId)}
        inputProps={imageProps}
        labelSlot={<div>Image</div>}
        errorSlot={
          <FormMessages
            id={fields.image.errorId}
            errors={fields.image.errors}
          />
        }
      />

      <div className="grid grid-cols-2 gap-x-4">
        <FormField>
          <FormLabel htmlFor={fields.username.id}>Username</FormLabel>
          <Input {...usernameProps} />
          <FormMessages
            id={fields.username.errorId}
            errors={fields.username.errors}
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor={fields.name.id}>Name</FormLabel>
          <Input {...nameProps} />
          <FormMessages id={fields.name.errorId} errors={fields.name.errors} />
        </FormField>

        <FormField>
          <FormLabel htmlFor={fields.email.id}>Email</FormLabel>
          <Input {...emailProps} />
          <FormMessages
            id={fields.email.errorId}
            errors={fields.email.errors}
          />
        </FormField>
      </div>

      <SubmitBtn>Save</SubmitBtn>
    </form>
  );
};

export default ChangeProfileForm;
