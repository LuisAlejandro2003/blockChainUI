import React, { useState, useEffect } from 'react';
import { Search, Copy, CheckCircle2 } from 'lucide-react';
import { getDataFromDB } from '../services/indexedDBService';

const Navbar: React.FC = () => {

  const [publicKey, setPublicKey] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const registerData = await getDataFromDB("registerData");
        if (registerData && Array.isArray(registerData)) {
          const activeUser = registerData.find(account => account.isActive);
          if (activeUser?.publicKey) {
            setPublicKey(activeUser.publicKey);
          } else {
            console.error("No se encontró un usuario activo con llave pública");
          }
        } else {
          console.error("No se encontraron datos de registro");
        }
      } catch (error) {
        console.error("Error al obtener la llave pública:", error);
      }
    };
    fetchPublicKey();
  }, []);



  const handleCopy = async () => {
    if (!publicKey) {
      console.error("No hay llave pública disponible para copiar");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(publicKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar la llave pública:", error);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative group">
            <input
              type="text"
              placeholder="Buscar pagaré..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                text-sm text-gray-900 placeholder-gray-500
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500
                hover:border-gray-300"
            />
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400
              group-hover:text-yellow-500 transition-colors duration-200" />
          </div>
        </div>

        {/* Public Key */}
        <div className="ml-8">
          <button
            onClick={handleCopy}
            className="flex items-center px-4 py-2 space-x-2 bg-gray-50 hover:bg-gray-100
              border border-gray-200 rounded-lg transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-yellow-500/20 group"
          >
            <span className="text-sm font-medium text-gray-700">
              Llave pública
            </span>
            {isCopied ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 transition-all duration-200" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-all duration-200" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;