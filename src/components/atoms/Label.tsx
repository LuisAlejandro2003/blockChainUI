// src/components/atoms/Label.tsx
import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className = '' }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
