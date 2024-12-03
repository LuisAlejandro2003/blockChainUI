import React, { useState, useEffect } from "react";
import axios from "axios";

const Table: React.FC = () => {
  const [data, setData] = useState([]); // Datos de los pagarés
  const [modalOpen, setModalOpen] = useState(false); // Control del modal
  const [selectedDetail, setSelectedDetail] = useState<any>(null); // Detalle del pagaré seleccionado
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); // Estado de carga para los detalles
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [fondeador, setFondeador] = useState("Ninguno"); // Estado para el select de Fondeador

  const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcmFwcDIiLCJpYXQiOjE3MzMxMjM4ODIsImV4cCI6MTczMzEyNzQ4Mn0.5HkJaxiD4gEWGvj4k9I2ZWXKYga1FOMek-pQISxAIZs";

  // Obtener todos los pagarés
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5005/getAll",
          {},
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
        setData(response.data); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al cargar los datos. Intente nuevamente.");
      }
    };

    fetchData();
  }, []);

  // Obtener los detalles de un pagaré
  const fetchDetails = async (id: string) => {
    setIsLoadingDetails(true); // Inicia la carga
    setError(null); // Reinicia el estado de error
    try {
      const response = await axios.post(
        "http://localhost:5005/gethistoryone",
        { id }, // Enviar el ID del pagaré al backend
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );
      const detail = response.data[0]; // Accede al primer registro devuelto
      setSelectedDetail(detail); // Guardar los detalles del pagaré
      setModalOpen(true); // Abrir el modal
    } catch (error) {
      console.error("Error al obtener los detalles:", error);
      setError("Error al cargar los detalles. Intente nuevamente.");
    } finally {
      setIsLoadingDetails(false); // Finaliza la carga
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDetail(null);
    setFondeador("Ninguno"); // Reiniciar el select de Fondeador
  };

  // Mapeo de etiquetas personalizadas
  const fieldLabels: { [key: string]: string } = {
    Montocredito: "Monto del Crédito",
    Plazo: "Plazo (días)",
    FechaPrimerPago: "Fecha del Primer Pago",
    PorInteres: "Porcentaje de Interés",
    PordeMoratorios: "Porcentaje de Moratorios",
    LugarCreacion: "Lugar de Creación",
    Desembolso: "Desembolso",
    Fecha: "Fecha de Creación",
    NumeroCliente: "Número de Cliente",
    CodigoCliente: "Código de Cliente",
    FechaVencimiento: "Fecha de Vencimiento",
    HashDocumento: "Hash del Documento",
    Owner: "Propietario",
    Estatus: "Estatus",
    txId: "ID de Transacción",
  };

  return (
    <div className="w-full px-10">
      <style>{`
        input:focus, select:focus {
          outline: none; /* Elimina el borde negro */
          border-color: #e2e8f0; /* Mantiene el borde original */
          box-shadow: none; /* Elimina sombras adicionales */
        }
      `}</style>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
              <td className="px-6 py-4 text-center text-gray-800">{item.Key}</td>
              <td className="px-6 py-4 text-center text-gray-800">
                {item.Record?.Fecha || "N/A"}
              </td>
              <td className="px-6 py-4 text-center text-gray-800">
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
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-auto p-6"
            style={{ maxHeight: "80%" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Detalles del pagaré
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ✖
              </button>
            </div>
            {isLoadingDetails ? (
              <p className="text-gray-600">Cargando...</p>
            ) : selectedDetail ? (
              <div className="space-y-4">
                {Object.keys(fieldLabels).map((key) => (
                  <div key={key}>
                    <label className="block font-medium text-gray-700">
                      {fieldLabels[key]}
                    </label>
                    <input
                      type="text"
                      value={
                        key === "txId"
                          ? selectedDetail.txId || "N/A"
                          : selectedDetail.Record?.[key] || "N/A"
                      }
                      readOnly
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-medium text-gray-700">
                    Fondeador
                  </label>
                  <select
                    value={fondeador}
                    onChange={(e) => setFondeador(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                  >
                    <option value="Ninguno">Ninguno</option>
                    <option value="Fondeador 1">Fondeador 1</option>
                    <option value="Fondeador 2">Fondeador 2</option>
                  </select>
                </div>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg mt-4">
                  Confirmar endoso
                </button>
              </div>
            ) : (
              <p className="text-red-500">No se encontraron detalles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
