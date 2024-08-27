"use client";
import { useFormStatus } from "react-dom";
import { ComponentPropsWithoutRef } from "react";
import clx from "clsx";
import { twMerge } from "tailwind-merge";

type SubmitBtnStatus = "idle" | "pending" | "success" | "error";

type SubmitBtnProps = ComponentPropsWithoutRef<"button"> & {
  children?: React.ReactNode;
  status?: SubmitBtnStatus;
  className?: string;
};

function SubmitBtn(props: SubmitBtnProps) {
  const { children, status, className, ...otherProps } = props;
  const { pending } = useFormStatus();

  const statusIcons = {
    idle: "",
    pending: "⏳",
    success: "✅",
    error: "❌",
  };

  const innerStatus = pending ? "pending" : status;

  return (
    <button
      type="submit"
      disabled={pending}
      className={twMerge(className, "flex items-center gap-2")}
      {...otherProps}
    >
      {children}
      {innerStatus ? (
        <span
          className={clx({
            "animate-spin": innerStatus === "pending",
          })}
        >
          {statusIcons[innerStatus]}
        </span>
      ) : null}
    </button>
  );
}

export default SubmitBtn;
