import React from "react";

interface CreditAgreementTemplateProps {
  title: string;
  children: React.ReactNode;
}

const CreditAgreementTemplate: React.FC<CreditAgreementTemplateProps> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{title}</h1>
        <div className="bg-white shadow-lg rounded-lg p-8">{children}</div>
      </div>
    </div>
  );
};

export default CreditAgreementTemplate;
