// src/components/atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'login'; // Variante para diseño del login
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'default',
}) => {
  const baseClasses =
    variant === 'login'
      ? 'w-5/6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-md font-semibold text-lg transition-all duration-300 hover:shadow-lg'
      : 'text-white bg-orange-500 hover:bg-orange-600 rounded-lg px-4 py-1';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
