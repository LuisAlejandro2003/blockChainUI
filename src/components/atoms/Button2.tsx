import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button2: React.FC<ButtonProps> = ({
  isLoading,
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  const variantStyles = {
    primary: "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};