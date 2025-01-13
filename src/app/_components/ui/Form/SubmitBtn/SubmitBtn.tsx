'use client';
import { useFormStatus } from 'react-dom';
import { cn } from '@/app/_utils/cn';
import Button, { ButtonProps } from '@/app/_components/ui/Button/Button';

type SubmitBtnStatus = 'idle' | 'pending' | 'success' | 'error';

type SubmitBtnProps = ButtonProps & {
  children?: React.ReactNode;
  status?: SubmitBtnStatus;
  className?: string;
};

function SubmitBtn(props: SubmitBtnProps) {
  const { children, status, className, ...otherProps } = props;
  const { pending } = useFormStatus();

  const statusIcons = {
    idle: '',
    pending: '⏳',
    success: '✅',
    error: '❌',
  };

  const innerStatus = pending ? 'pending' : status;

  return (
    <Button
      type="submit"
      disabled={pending}
      className={className}
      {...otherProps}
      iconAfter={
        innerStatus ? (
          <span
            className={cn({
              'animate-spin': innerStatus === 'pending',
            })}
          >
            {statusIcons[innerStatus]}
          </span>
        ) : null
      }
    >
      {children}
    </Button>
  );
}

export { SubmitBtn };
