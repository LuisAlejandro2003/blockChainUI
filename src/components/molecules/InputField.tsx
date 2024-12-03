// src/components/molecules/InputField.tsx
import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  readOnly = false,
  type = 'text',
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} readOnly={readOnly} type={type} />
    </div>
  );
};

export default InputField;
