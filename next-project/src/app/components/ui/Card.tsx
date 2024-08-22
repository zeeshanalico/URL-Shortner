// components/ui/card.tsx
import React from "react";

type CardProps = React.HTMLProps<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={`bg-white shadow-lg rounded-lg overflow-hidden !border-1 !border-black-500 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={`p-4 border-b ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardProps> = ({ className, children, ...props }) => (
  <h2 className={`text-xl font-bold ${className}`} {...props}>
    {children}
  </h2>
);

export const CardContent: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);
