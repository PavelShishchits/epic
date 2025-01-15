'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

import {
  CsrfTokenField,
  FormField,
  FormMessages,
  HoneypotField,
  Input,
  SubmitBtn,
} from '@/app/_components/ui/Form/';
import { SEARCH_USERS_QUERY_PARAM } from '@/app/_utils/constants';
import { debounce } from '@/app/_utils/debounce';
import { searchUsersSchema } from '@/schema/user';

export default function UsersSearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [form, fields] = useForm({
    id: 'users-search-form',
    constraint: getZodConstraint(searchUsersSchema),
    onValidate(context) {
      return parseWithZod(context.formData, {
        schema: searchUsersSchema,
      });
    },
    onSubmit(e) {
      e.preventDefault();
    },
    defaultValue: {
      username: searchParams.get(SEARCH_USERS_QUERY_PARAM) ?? '',
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  });

  const assignSearchParams = (username: string) => {
    const params = new URLSearchParams(searchParams);
    if (username) {
      params.set(SEARCH_USERS_QUERY_PARAM, username);
    } else {
      params.delete(SEARCH_USERS_QUERY_PARAM);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const debouncedAssignSearchParams = debounce(assignSearchParams, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedAssignSearchParams(value);
  };

  const { key: usernameKey, ...usernameProps } = getInputProps(
    fields.username,
    {
      type: 'search',
      placeholder: 'Search users',
    }
  );

  return (
    <form {...getFormProps(form)}>
      <CsrfTokenField />
      <HoneypotField />
      <div className="flex gap-2">
        <FormField>
          <Input
            placeholder="Search users"
            onChange={handleInputChange}
            {...usernameProps}
          />
          <FormMessages
            errors={fields.username.errors}
            id={fields.username.errorId}
          />
        </FormField>
        <SubmitBtn>Search</SubmitBtn>
      </div>
    </form>
  );
}
