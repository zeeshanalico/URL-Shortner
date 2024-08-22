// components/ui/button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
};

export const Button: React.FC<ButtonProps> = ({ variant = "default", size = "default", className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-all";
  const variantStyle = {
    default: "bg-primary text-white hover:bg-primary-dark",
    outline: "border border-primary text-primary hover:bg-primary-light",
    ghost: "text-primary hover:bg-primary-light"
  }[variant];
  const sizeStyle = {
    default: "px-4 py-2",
    icon: "p-2"
  }[size];

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`} {...props} />
  );
};
