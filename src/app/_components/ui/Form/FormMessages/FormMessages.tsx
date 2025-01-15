import React from 'react';

import { cn } from '@/app/_utils/cn';

interface FormMessagesProps extends React.HTMLAttributes<HTMLUListElement> {
  errors?: string[] | null;
}

const FormMessages = React.forwardRef<HTMLUListElement, FormMessagesProps>(
  ({ className, id, errors, ...props }, ref) => {
    return errors?.length ? (
      <ul
        ref={ref}
        className={cn(
          'flex flex-col gap-2 text-sm font-medium text-destructive',
          className
        )}
        id={id}
        {...props}
      >
        {errors.map((error: string) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    ) : null;
  }
);

FormMessages.displayName = 'FormMessages';

export { FormMessages, type FormMessagesProps };
