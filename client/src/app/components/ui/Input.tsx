import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={`border rounded-md px-4 py-2 text-base border-primary focus:ring-primary ${className}`}
    {...props}
  />
);
