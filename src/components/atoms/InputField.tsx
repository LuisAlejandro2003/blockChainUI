// src/components/atoms/InputField.tsx
import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  variant?: 'default' | 'login'; // Variante para diseño del login
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className = '',
  variant = 'default', // Variante por defecto
}) => {
  const baseClasses =
    variant === 'login'
      ? 'w-5/6 px-4 py-2 border border-[#0E4A67] rounded-md text-[#0E4A67] focus:outline-none text-base'
      : 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
    />
  );
};

export default InputField;
