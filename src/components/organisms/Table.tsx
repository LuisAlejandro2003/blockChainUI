// src/components/organisms/Table.tsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { fetchAllPagares, fetchPagareDetails } from "../services/apiService";

const Table: React.FC = () => {
  const [data, setData] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedDetail, setSelectedDetail] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [fondeador, setFondeador] = useState("Ninguno"); 

  // Obtener todos los pagarés
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const pagares = await fetchAllPagares(); // Llamada al servicio
        setData(pagares); // Guardar los datos en el estado
      } catch (err: any) {
        setError(err.message || "Error al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtener detalles de un pagaré
  const fetchDetails = async (id: string) => {
    setIsLoading(true); // Inicia la carga
    try {
      const detail = await fetchPagareDetails(id); // Llamada al servicio
      setSelectedDetail(detail); // Guardar los detalles del pagaré
      setModalOpen(true); // Abrir el modal
    } catch (err: any) {
      setError(err.message || "Error al cargar los detalles.");
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
    setFondeador("Ninguno");
  };

  return (
    <div className="w-full px-10">
      {isLoading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-4 text-center font-medium">No. Pagaré</th>
            <th className="px-6 py-4 text-center font-medium">Fecha</th>
            <th className="px-6 py-4 text-center font-medium">Ubicación</th>
            <th className="px-6 py-4 text-center font-medium">Estatus</th>
            <th className="px-6 py-4 text-center font-medium">Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="px-6 py-4 text-center">{item.Key}</td>
              <td className="px-6 py-4 text-center">
                {item.Record?.Fecha || "N/A"}
              </td>
              <td className="px-6 py-4 text-center">
                {item.Record?.LugarCreacion || "N/A"}
              </td>
              <td
                className={`px-6 py-4 text-center font-semibold ${
                  item.Record?.Estatus === "Activo"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.Record?.Estatus || "N/A"}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  className="text-white bg-orange-500 hover:bg-orange-600 rounded-lg px-4 py-1"
                  onClick={() => fetchDetails(item.Key)}
                >
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        data={selectedDetail}
        fondeador={fondeador}
        setFondeador={setFondeador}
      />
    </div>
  );
};

export default Table;
