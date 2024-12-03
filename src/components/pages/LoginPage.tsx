import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
