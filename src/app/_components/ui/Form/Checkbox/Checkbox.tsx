'use client';

import * as React from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/app/_utils/cn';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  triggerClassName?: string;
  indicatorClassName?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, triggerClassName, indicatorClassName, ...props }, ref) => (
    <div className={cn('relative', className)}>
      <input type="checkbox" ref={ref} className="peer sr-only" {...props} />
      <div
        className={cn(
          'h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground',
          triggerClassName
        )}
      />
      <Check
        className={cn(
          'h-4 w-4 absolute left-0 top-0 opacity-0 peer-checked:opacity-100 pointer-events-none text-primary-foreground',
          indicatorClassName
        )}
      />
    </div>
  )
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
