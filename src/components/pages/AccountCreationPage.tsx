import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCreationStepOne from '../organisms/AccountCreationStepOne';
import RegisterPage from './RegisterPage';
import { fetchSeedWords } from '../services/apiService';

const AccountCreationPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [seedWords, setSeedWords] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSeedWords = async () => {
      try {
        const words = await fetchSeedWords();
        setSeedWords(words);
      } catch (error) {
        console.error('Error al cargar las palabras de recuperación:', error);
      }
    };

    loadSeedWords();
  }, []);

  const handleNext = () => {
    const shuffledIndices = Array.from({ length: 12 }, (_, i) => i).sort(() => Math.random() - 0.5);
    const preFilledIndices = shuffledIndices.slice(0, 8);
    const preFilledWords = Array(12).fill("");
    preFilledIndices.forEach(index => {
      preFilledWords[index] = seedWords[index];
    });
    navigate('/secondStep', { state: { seedWords: preFilledWords } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {step === 1 && <AccountCreationStepOne seedWords={seedWords} onNext={handleNext} />}
    </div>
  );
};

export default AccountCreationPage;