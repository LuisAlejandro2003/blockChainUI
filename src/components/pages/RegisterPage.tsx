import React from "react";
import { useLocation } from "react-router-dom";
import RegisterForm from "../organisms/RegisterForm";

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const seedWords = location.state?.seedWords || Array(12).fill("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <RegisterForm seedWords={seedWords} />
    </div>
  );
};

export default RegisterPage;