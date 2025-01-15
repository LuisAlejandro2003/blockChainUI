import React from 'react';
import LoginForm from '../molecules/LoginForm';
import image from '../../assets/images/imageLogin.png';

const LoginContent: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Left side with image */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent z-10" />
        <img
          src={image}
          alt="Login"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
          <h2 className="text-3xl font-bold mb-3">Bienvenido de nuevo</h2>
          <p className="text-base opacity-90">Accede a tu cuenta para continuar.</p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginContent;