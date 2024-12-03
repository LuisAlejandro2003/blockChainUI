import React from 'react';

interface TextLinkProps {
  text: string;
  href: string;
  color?: string;
}

const TextLink: React.FC<TextLinkProps> = ({ text, href, color = '#FC7B3F' }) => {
  return (
    <a href={href} className="text-sm" style={{ color }}>
      {text}
    </a>
  );
};

export default TextLink;
