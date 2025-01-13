import React from 'react';
import * as Label from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/_utils/cn';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label.Root>,
  React.ComponentPropsWithoutRef<typeof Label.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <Label.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));

FormLabel.displayName = Label.Root.displayName;

export { FormLabel };
