// src/components/molecules/LoginForm.tsx
import React, { useState } from 'react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import { FaEye } from 'react-icons/fa';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col items-start p-8 w-full max-w-md mx-auto bg-transparent">
      {/* Título del formulario */}
      <h2
        className="text-3xl font-semibold mb-2"
        style={{
          fontFamily: 'Poppins, sans-serif',
          color: '#0E4A67',
          textAlign: 'left',
        }}
      >
        Inicio de sesión
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: '#0E4A67', textAlign: 'left' }}
      >
        No tienes una cuenta?{' '}
        <a href="#" className="text-orange-500 font-medium hover:underline">
          Crear ahora
        </a>
      </p>

      {/* Inputs de correo y contraseña */}
      <form className="w-full">
        <div className="mb-4">
          <label
            className="block text-[#0E4A67] text-sm font-semibold mb-1"
          >
            Correo
          </label>
          <InputField
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#0E4A67] rounded-md text-[#0E4A67] focus:outline-none text-base"
          />
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-[#0E4A67] text-sm font-semibold mb-1"
          >
            Contraseña
          </label>
          <div className="relative w-full">
            <InputField
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#0E4A67] rounded-md text-[#0E4A67] focus:outline-none text-base pr-10"
            />
            <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0E4A67]" />
          </div>
        </div>

        {/* Botón de inicio de sesión */}
        <Button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-md font-semibold text-lg transition-all duration-300 hover:shadow-lg"
        >
          Iniciar sesión
        </Button>

        {/* Enlaces debajo del botón */}
        <div className="flex justify-between mt-4 w-full text-sm">
          <a href="#" className="text-[#0E4A67] hover:underline">
            Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
