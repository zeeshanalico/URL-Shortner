// components/ui/switch.tsx
import React from "react";

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Switch: React.FC<SwitchProps> = ({ className, ...props }) => (
  <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
    <input type="checkbox" className="sr-only" {...props} />
    <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
    <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform transform translate-x-0"></span>
  </label>
);
