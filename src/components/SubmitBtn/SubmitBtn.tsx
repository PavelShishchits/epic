"use client";
import { useFormStatus } from "react-dom";
import { ComponentPropsWithoutRef } from 'react';

type SubmitBtnProps = ComponentPropsWithoutRef<'button'> & {
  children?: React.ReactNode;
};

function SubmitBtn(props: SubmitBtnProps) {
  const { children, ...otherProps } = props;
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default SubmitBtn;
