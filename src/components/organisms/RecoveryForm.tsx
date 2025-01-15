import React, { useState } from 'react';
import { KeyRound, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { recoverAccount } from '../services/apiService';

const RecoveryForm: React.FC = () => {
  const [words, setWords] = useState<string[]>(Array(12).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleSubmit = async () => {
    // Validar email
    if (!email || !email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa un correo electrónico válido.',
      });
      return;
    }

    // Validar contraseñas
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const mnemonic = words.join(' ');
      await recoverAccount(mnemonic, newPassword, email);

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Cuenta recuperada correctamente.',
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error en la recuperación:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al recuperar la cuenta.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
              <KeyRound className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Recuperación de Cuenta
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Ingresa las 12 palabras de recuperación, tu correo electrónico y configura tu nueva contraseña
              para restablecer el acceso a tu cuenta.
            </p>
          </div>

          {/* Recovery Words Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {words.map((word, index) => (
              <div key={index} className="relative">
                <span className="absolute left-3 top-3 text-xs font-medium text-gray-400">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={word}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full px-8 py-3 bg-gray-50 border border-gray-200 rounded-lg
                    focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                    transition-colors duration-200"
                  placeholder={`Palabra ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Email Field */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                transition-colors duration-200"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>

          {/* Password Section */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                  focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                  transition-colors duration-200"
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                  focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                  transition-colors duration-200"
                placeholder="Confirma tu nueva contraseña"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 text-white font-medium rounded-lg
                hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-500/50
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                min-w-[200px] justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                'Recuperar Cuenta'
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Asegúrate de que las palabras ingresadas sean exactamente las mismas
              que recibiste durante el registro de tu cuenta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryForm;