// src/components/molecules/SelectField.tsx
import React from 'react';
import Label from '../atoms/Label';

interface SelectFieldProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
