import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/_utils/cn';
import { JSX } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-h3 sm:text-h1 font-family-medium mb-4',
      h2: 'text-h3 sm:text-h2 font-family-medium mb-4',
      h3: 'text-h4 sm:text-h3 font-family-medium mb-3',
      h4: 'text-h5 sm:text-h4 font-family-medium mb-3',
      h5: 'text-h6 sm:text-h5 font-family-medium mb-2',
      h6: 'text-sm sm:text-h6 font-family-medium mb-2',
      p: 'text-base font-family-regular mb-4',
    },
  },
});

type TypographyVariants = VariantProps<typeof typographyVariants>;

export type TypographyProps = TypographyVariants & {
  children?: React.ReactNode;
  className?: string;
  tag: keyof JSX.IntrinsicElements;
};

function Typography(props: TypographyProps) {
  const { children, variant, className, tag, ...otherProps } = props;

  const Tag = tag;

  return (
    <Tag
      className={cn(typographyVariants({ variant, className }))}
      {...otherProps}
    >
      {children}
    </Tag>
  );
}

export { typographyVariants };
export default Typography;
