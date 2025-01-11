import React from "react";
import Button from "../atoms/Button";
import { updatePagareOwner } from "../services/apiService";
import { X } from "lucide-react"; // Using Lucide icons

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  fondeador: string;
  setFondeador: (value: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  fondeador,
  setFondeador,
}) => {
  if (!isOpen || !data) return null;

  const fieldLabels: { [key: string]: string } = {
    txId: "ID de Transacción",
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
  };

  const formatValue = (key: string, value: string | number | undefined) => {
    if (!value || value === "N/A") return "N/A";

    if (key === "Montocredito" || key === "Desembolso") {
      return `$${value}`;
    }

    if (key === "PorInteres" || key === "PordeMoratorios") {
      return `${value}%`;
    }

    return value;
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirmEndoso = async () => {
    try {
      await updatePagareOwner(data.txId, fondeador);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el propietario del pagaré:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all"
        style={{ maxHeight: "85vh" }}
      >
        {/* Modal Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Detalles del pagaré
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="px-6 py-4 overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 180px)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(fieldLabels).map((key) => {
              if (key === "FechaVencimiento" || key === "HashDocumento") {
                return null; // No renderizamos estos aquí, se manejan juntos más adelante
              }

              return (
                <div
                  key={key}
                  className={`${
                    key === "txId" ? "col-span-full" : ""
                  }`}
                >
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {fieldLabels[key]}
                  </label>
                  <div
                    className={`
                      ${key === "txId" ? "break-all" : ""}
                      ${key === "Estatus" ? "font-medium" : ""}
                      bg-gray-50 px-4 py-2.5 text-gray-800 text-sm rounded-lg border border-gray-200
                      ${data.Record?.[key] === "Activo" ? "text-green-600" : ""}
                      ${data.Record?.[key] === "Inactivo" ? "text-red-600" : ""}
                    `}
                  >
                    {formatValue(
                      key,
                      key === "txId" ? data.txId : data.Record?.[key]
                    )}
                  </div>
                </div>
              );
            })}

            {/* Fecha de Vencimiento y Hash del Documento en la misma fila */}
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {fieldLabels["FechaVencimiento"]}
                </label>
                <div className="bg-gray-50 px-4 py-2.5 text-gray-800 text-sm rounded-lg border border-gray-200">
                  {formatValue(
                    "FechaVencimiento",
                    data.Record?.["FechaVencimiento"]
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {fieldLabels["HashDocumento"]}
                </label>
                <div className="bg-gray-50 px-4 py-2.5 text-gray-800 text-sm rounded-lg border border-gray-200 break-all">
                  {formatValue("HashDocumento", data.Record?.["HashDocumento"])}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
      
      </div>
    </div>
  );
};

export default Modal;
