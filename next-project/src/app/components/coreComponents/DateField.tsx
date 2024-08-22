// components/ui/DateField.tsx
import React from 'react';

interface DateFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const DateField: React.FC<DateFieldProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ id, label, value, onChange, error ,...rest}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
    <input
      id={id}
      type="date"
      value={value}
      onChange={onChange}
      {...rest}
      className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default DateField;
