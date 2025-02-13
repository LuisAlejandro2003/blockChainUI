import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, KeyRound, ArrowRight, Copy, Check } from 'lucide-react';
import { fetchSeedWords } from '../services/apiService';

const AccountCreationPage: React.FC = () => {
  const [seedWords, setSeedWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSeedWords = async () => {
      try {
        const words = await fetchSeedWords();
        setSeedWords(words);
      } catch (error) {
        console.error('Error al cargar las palabras de recuperación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSeedWords();
  }, []);

  const handleCopyAll = async () => {
    try {
      const allWords = seedWords.join(' ');
      await navigator.clipboard.writeText(allWords);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset después de 2 segundos
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleNext = () => {
    const shuffledIndices = Array.from({ length: 12 }, (_, i) => i)
      .sort(() => Math.random() - 0.5);
    const preFilledIndices = shuffledIndices.slice(0, 8);
    const preFilledWords = Array(12).fill('');
    preFilledIndices.forEach(index => {
      preFilledWords[index] = seedWords[index];
    });
    navigate('/informationTwo', { state: { seedWords: preFilledWords } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Cargando palabras de recuperación...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center w-64">
              <div className="w-5 h-5 rounded-full bg-yellow-500" />
              <div className="flex-1 h-1 mx-2 bg-gray-200" />
              <div className="w-5 h-5 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
              <KeyRound className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Palabras de Recuperación
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Guarda estas 12 palabras en un lugar seguro. Las necesitarás para recuperar tu cuenta.
              No las compartas con nadie.
            </p>
          </div>

          {/* Seed Words Grid */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-4 mb-12">
              {seedWords.map((word, index) => (
                <div
                  key={index}
                  className="relative flex items-center bg-gray-50 rounded-lg border border-gray-200 p-3"
                >
                  <span className="text-sm font-medium text-gray-400 mr-3">
                    {index + 1}.
                  </span>
                  <span className="text-gray-900 font-medium">{word}</span>
                </div>
              ))}
            </div>

            {/* Botón de copiar todas las palabras */}
            <button
              onClick={handleCopyAll}
              className="absolute -top-2 -right-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200
                hover:bg-gray-50 transition-colors duration-200 group focus:outline-none
                focus:ring-2 focus:ring-yellow-500/50"
              title="Copiar todas las palabras"
            >
              {isCopied ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Copiado</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-900">
                  <Copy className="w-5 h-5" />
                  <span className="text-sm font-medium">Copiar todo</span>
                </div>
              )}
            </button>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg
                hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-500/50
                transition-colors duration-200"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Asegúrate de guardar estas palabras en un lugar seguro y privado.
            No las captures en pantalla ni las compartas con nadie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationPage;