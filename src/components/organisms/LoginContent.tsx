import React from 'react';
import LoginForm from '../molecules/LoginForm';
import image from '../../assets/images/imageLogin.png'; 

const LoginContent: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Imagen a la izquierda */}
      <div className="flex-1 hidden md:block">
        <img src={image} alt="Login" className="object-cover w-full h-full" />
      </div>
      {/* Formulario de Login a la derecha */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFBFC] p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginContent;
