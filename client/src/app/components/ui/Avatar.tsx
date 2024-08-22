import React from "react";

type AvatarProps = React.HTMLProps<HTMLDivElement>;

export const Avatar: React.FC<AvatarProps> = ({ className, children, ...props }) => (
  <div className={`inline-flex items-center justify-center rounded-full overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img className="w-full h-full object-cover" {...props} />
);

export const AvatarFallback: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <span className="flex items-center justify-center w-full h-full text-white bg-gray-500">{children}</span>
);
