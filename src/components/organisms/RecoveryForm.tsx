import React, { useState } from 'react';
import { KeyRound, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const RecoveryForm: React.FC = () => {
  const [words, setWords] = useState<string[]>(Array(12).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      console.log('Palabras ingresadas:', words);
      console.log('Nueva contraseña:', newPassword);
      
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Contraseña restablecida correctamente.',
      });
      
      setIsLoading(false);
    }, 1000);
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
              Recuperación de Contraseña
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Ingresa las 12 palabras de recuperación y configura tu nueva contraseña
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
                'Restablecer Contraseña'
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