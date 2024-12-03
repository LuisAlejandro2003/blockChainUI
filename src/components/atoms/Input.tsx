// src/components/atoms/Input.tsx
import React from 'react';

interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  readOnly = false,
  className = '',
  type = 'text',
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`mt-1 block w-full border-gray-300 rounded-lg shadow-sm ${className}`}
    />
  );
};

export default Input;
