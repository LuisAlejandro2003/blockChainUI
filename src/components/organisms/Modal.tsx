import React from "react";
import Button from "../atoms/Button";

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
      return `$${value}`; // Agregar símbolo de peso
    }

    if (key === "PorInteres" || key === "PordeMoratorios") {
      return `${value}%`; // Agregar símbolo de porcentaje
    }

    return value; // Devolver el valor sin formato
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto"
        style={{ maxHeight: "80%" }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Detalles del pagaré</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg font-bold"
            aria-label="Cerrar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {Object.keys(fieldLabels).map((key) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                {fieldLabels[key]}
              </label>
              <div
                className={`${
                  key === "txId" ? "overflow-auto break-words" : ""
                } bg-gray-100 px-4 py-2 text-gray-800 text-sm rounded-sm`}
              >
                {formatValue(
                  key,
                  key === "txId" ? data.txId : data.Record?.[key]
                )}
              </div>
            </div>
          ))}

          {/* Dropdown Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Fondeador
            </label>
            <select
              value={fondeador}
              onChange={(e) => setFondeador(e.target.value)}
              className="bg-gray-100 px-4 py-2 text-sm text-gray-800 rounded-sm w-full"
            >
              <option value="Ninguno">Ninguno</option>
              <option value="Fondeador 1">Fondeador 1</option>
              <option value="Fondeador 2">Fondeador 2</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 text-sm">
            Confirmar endoso
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
