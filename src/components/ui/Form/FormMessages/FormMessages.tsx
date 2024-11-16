import { cn } from '@/lib/utils';
import React from 'react';

interface FormMessagesProps extends React.HTMLAttributes<HTMLParagraphElement> {
  errors?: string[] | null;
}

const FormMessages = React.forwardRef<HTMLParagraphElement, FormMessagesProps>(
  ({ className, id, errors, ...props }, ref) => {
    return errors?.length ? (
      <p
        ref={ref}
        id={id}
        className={cn('text-sm font-medium text-destructive', className)}
        {...props}
      >
        <ul className="flex flex-col gap-2" id={id}>
          {errors.map((error: string) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </p>
    ) : null;
  }
);

FormMessages.displayName = 'FormMessages';

export { FormMessages, type FormMessagesProps };
