import React from 'react';
import { cn } from '@/lib/utils';

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-2 mb-5', className)} {...props}></div>
  );
});

FormField.displayName = 'FormField';

export { FormField };
