import React, { useState } from 'react';
import {IoChevronDown,IoChevronUp} from '../../../../public/icons'
interface Option {
  value: string;
  label: string;
  color?: string;
}

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(value);

  const handleSelect = (option: Option) => {
    setSelectedOption(option.value);
    onChange({ target: { value: option.value, id } } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm bg-white p-3`}
      >
        <div className="flex justify-between items-center">
          <span>{options.find(option => option.value === selectedOption)?.label || 'Select an option'}</span>
          <IoChevronUp  className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <ul className="absolute mt-3 right-0 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`p-2 cursor-pointer hover:bg-green-500 hover:rounded-md ${option.color ? `text-${option.color}` : ''}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
