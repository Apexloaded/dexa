import React, { ForwardedRef, forwardRef } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isOutline?: boolean;
}

const Input = forwardRef(
  (
    { className, isOutline = true, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full px-4 ${className} text-base h-[3.2rem] ${
          isOutline ? "outline-primary" : "outline-none"
        }`}
      />
    );
  }
);

export default Input;
