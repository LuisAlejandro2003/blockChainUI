import React, { useState, useEffect } from 'react';
import { EndorseTable } from '../organisms/EndorseTable';
import { EndorseModal } from '../molecules/EndoseModal';
import { fetchAllPagares, updatePagareOwner } from '../services/apiService';

interface PagareRecord {
  Key: string;
  Record: {
    Fecha: string;
    LugarCreacion: string;
    Estatus: string;
  };
}

const EndorsePage: React.FC = () => {
  const [data, setData] = useState<PagareRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPagareId, setSelectedPagareId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllPagares();
      console.log("Respuesta de fetchAllPagares:", response);
      setData(response || []); // Asegurarnos de que siempre sea un array
    } catch (error: any) {
      const errorMessage = error.message || "Error al cargar los pagarés";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndorse = (id: string) => {
    setSelectedPagareId(id);
    setIsModalOpen(true);
  };

  const handleUpdateOwner = async (newOwner: string) => {
    if (!selectedPagareId) return;

    try {
      await updatePagareOwner(selectedPagareId, newOwner);
      // Refrescar la lista de pagarés
      await fetchData();
      setIsModalOpen(false);
      setSelectedPagareId(null);
    } catch (error: any) {
      const errorMessage = error.message || "Error al actualizar el propietario";
      setError(errorMessage);
    }
  };

  if (error) {
    return (
      <div className="w-full px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-center font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Endosar Pagarés</h1>
        <p className="mt-2 text-gray-600">
          Gestione el endoso de pagarés a nuevos propietarios
        </p>
      </div>

      <EndorseTable
        data={data}
        isLoading={isLoading}
        onEndorse={handleEndorse}
      />

      <EndorseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPagareId(null);
        }}
        onSubmit={handleUpdateOwner}
        pagareId={selectedPagareId || ''}
      />
    </div>
  );
}

export default EndorsePage;