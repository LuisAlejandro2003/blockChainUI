import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock } from 'lucide-react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginUser } from '../services/apiService';
import Swal from 'sweetalert2';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa un correo electrónico válido.',
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa tu contraseña.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const loginSuccessful = await loginUser(email, password);
      if (loginSuccessful) {
        navigate('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales inválidas. Por favor verifica tus datos.',
        });
      }
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al iniciar sesión. Verifica tus credenciales.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-[#0E4A67]">
          Inicio de sesión
        </h2>
        <p className="text-muted-foreground">
          No tienes una cuenta?{' '}
          <a 
            href="/informationOne" 
            className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            Crear ahora
          </a>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0E4A67]">
            Correo
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <InputField
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0E4A67]">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-base transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Iniciando sesión...</span>
            </div>
          ) : (
            'Iniciar sesión'
          )}
        </Button>

        <div className="flex justify-between pt-2">
          <a 
            href="/recovery" 
            className="text-sm text-[#0E4A67] hover:text-orange-500 transition-colors"
          >
            Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;