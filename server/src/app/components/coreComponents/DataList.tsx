import React from 'react';

interface DataListProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: string[];
    error?: string;
    placeholder?: string;
}

const DataList: React.FC<DataListProps> = ({
    id,
    label,
    value,
    onChange,
    options,
    error,
    placeholder,
    ...rest
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
            <input
                id={id}
                type="text"
                value={value}
                onChange={onChange}
                className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500`}
                placeholder={placeholder}
                list='dataList'
                {...rest}
            />
            <datalist id="dataList">
                {options.map(option => (
                    <option key={option} value={option} />
                ))}
            </datalist>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

export default DataList;
