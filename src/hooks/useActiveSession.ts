import { useState, useEffect } from 'react';
import { getDataFromDB } from '../components/services/indexedDBService';

interface RegisterData {
  encrypted: string;
  publicKey: string;
  email: string;
  isActive: boolean;
}

export const useActiveSession = () => {
  const [activePublicKey, setActivePublicKey] = useState<string | null>(null);

  useEffect(() => {
    const getActiveSession = async () => {
      try {
        const accounts = await getDataFromDB("registerData") || [];
        const activeAccount = accounts.find((account: RegisterData) => account.isActive);
        
        if (activeAccount) {
          setActivePublicKey(activeAccount.publicKey);
        }
      } catch (error) {
        console.error('Error al obtener la sesión activa:', error);
      }
    };

    getActiveSession();
  }, []);

  return { activePublicKey };
}; 