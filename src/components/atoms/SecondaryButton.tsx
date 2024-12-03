import React from 'react';

interface SecondaryButtonProps {
  text: string;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, className }) => {
  return (
    <button
      className={`bg-[#FF6B35] text-white py-3 px-6 rounded-md ${className}`}
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {text}
    </button>
  );
};
