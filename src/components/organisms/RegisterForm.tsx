import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { registerUserWithSeed } from '../services/apiService';

interface RegisterFormProps {
  seedWords: string[];
}

const RegisterForm: React.FC<RegisterFormProps> = ({ seedWords }) => {
  const [words, setWords] = useState<string[]>(seedWords);
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
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    setIsLoading(true);
    const mnemonic = words.join(' ');

    try {
      await registerUserWithSeed(mnemonic, newPassword, email);
      Swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'Usuario registrado correctamente.',
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al intentar registrar el usuario.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-64">
            <div className="w-5 h-5 rounded-full bg-gray-300" />
            <div className="flex-1 h-1 mx-2 bg-yellow-500" />
            <div className="w-5 h-5 rounded-full bg-yellow-500" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-600">
            Ingresa las 12 palabras para confirmar y crear tu cuenta.
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

        {/* Password and Submit Section */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                transition-colors duration-200"
            />
          </div>
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                transition-colors duration-200"
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                transition-colors duration-200"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg
                hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-500/50
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Registrarse'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;