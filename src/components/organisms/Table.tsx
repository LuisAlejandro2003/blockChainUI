import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { EndorseModal } from "../molecules/EndoseModal";
import { fetchAllPagares, fetchPagareDetails, updatePagareOwner } from "../services/apiService";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface PagareDetail {
  Record: {
    Montocredito: string;
    Plazo: string;
    FechaPrimerPago: string;
    PorInteres: string;
    PordeMoratorios: string;
    LugarCreacion: string;
    Desembolso: string;
    Fecha: string;
    NumeroCliente: string;
    CodigoCliente: string;
    FechaVencimiento: string;
    HashDocumento: string;
    Owner: string;
    Estatus: string;
  };
  txId: string;
  timestamp: string;
  isDelete: boolean;
}

const ITEMS_PER_PAGE = 5;

const Table: React.FC = () => {
  const [data, setData] = useState<any[]>([]); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedDetail, setSelectedDetail] = useState<PagareDetail | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [fondeador, setFondeador] = useState("Ninguno"); 
  const [endorseModalOpen, setEndorseModalOpen] = useState(false);
  const [selectedPagareId, setSelectedPagareId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllPagares();
      console.log("Respuesta de fetchAllPagares:", response);
      setData(response || []);
    } catch (err: any) {
      setError(err.message || "Error al cargar los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const detail = await fetchPagareDetails(id);
      console.log("Detalles del pagaré:", detail);
      setSelectedDetail(detail);
      setModalOpen(true);
    } catch (err: any) {
      setError(err.message || "Error al cargar los detalles.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndorse = (id: string) => {
    setSelectedPagareId(id);
    setEndorseModalOpen(true);
  };

  const handleUpdateOwner = async (newOwner: string) => {
    if (!selectedPagareId) return;

    try {
      await updatePagareOwner(selectedPagareId, newOwner);
      // Refrescar la lista de pagarés
      await fetchData();
      setEndorseModalOpen(false);
      setSelectedPagareId(null);
    } catch (error: any) {
      const errorMessage = error.message || "Error al actualizar el propietario";
      setError(errorMessage);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
    setFondeador("Ninguno");
  };

  // Paginación
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    <div className="w-full px-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  No. Pagaré
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Ubicación
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Estatus
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No hay pagarés disponibles
                  </td>
                </tr>
              ) : (
                currentData.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="group hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {item.Key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.Record?.Fecha || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.Record?.LugarCreacion || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            item.Record?.Estatus === "Activo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {item.Record?.Estatus || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => fetchDetails(item.Key)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white
                          bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
                          disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={isLoading}
                      >
                        Detalles
                      </button>
                      <button
                        onClick={() => handleEndorse(item.Key)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white
                          bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                          disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={isLoading}
                      >
                        Endosar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {data.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                  text-gray-700 bg-white border border-gray-300 hover:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                  text-gray-700 bg-white border border-gray-300 hover:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando{' '}
                  <span className="font-medium">{startIndex + 1}</span>
                  {' '}-{' '}
                  <span className="font-medium">
                    {Math.min(endIndex, data.length)}
                  </span>
                  {' '}de{' '}
                  <span className="font-medium">{data.length}</span>
                  {' '}resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300
                      bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Anterior</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${currentPage === i + 1
                          ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300
                      bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Siguiente</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        data={selectedDetail}
        fondeador={fondeador}
        setFondeador={setFondeador}
      />

      {/* Modal de Endoso */}
      <EndorseModal
        isOpen={endorseModalOpen}
        onClose={() => {
          setEndorseModalOpen(false);
          setSelectedPagareId(null);
        }}
        onSubmit={handleUpdateOwner}
        pagareId={selectedPagareId || ''}
      />
    </div>
  );
};

export default Table;