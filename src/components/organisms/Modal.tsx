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
    BuenoPor: "Bueno por",
    Plazo: "Plazo",
    DesPlazo: "Descripción del Plazo",
    TasaInteres: "Tasa de interés (%)",
    TasaInteresMoratorio: "Tasa moratoria (%)",
    LugarDesembolso: "Lugar de desembolso",
    FechaDesembolso: "Fecha de desembolso",
    FechaVigencia: "Fecha de vigencia",
    FechaPrimerPago: "Fecha del primer pago",
    NumeroCredito: "Número del crédito",
    CodigoCliente: "Código del cliente",
    HashDocumento: "Hash del documento",
    Owner: "Pagar a la orden de",
    Estatus: "Estatus",
  };

  const formatValue = (key: string, value: string | number | undefined) => {
    if (!value || value === "N/A") return "N/A";

    if (key === "BuenoPor") {
      return `$${value}`;
    }

    if (key === "TasaInteres" || key === "TasaInteresMoratorio") {
      return `${value}%`;
    }

    if (key === "Owner" && value === "041adae6e04383f75d734b6fbcdf21e445ae411d332cfaf5c0b7237a89849277192c8faf53fe79cf05af443aa9d9eddcad44b4ca3950be695121c6f8038e82520a") {
      return "Alsol Contigo, S.A. de C.V., SOFOM, E.N.R.";
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
            {/* ID de Transacción */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {fieldLabels["txId"]}
              </label>
              <div className="break-all bg-gray-50 px-4 py-2.5 text-gray-800 text-sm rounded-lg border border-gray-200">
                {formatValue("txId", data.txId)}
              </div>
            </div>

            {/* Pagar a la orden de */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {fieldLabels["Owner"]}
              </label>
              <div className="bg-gray-50 px-4 py-2.5 text-gray-800 text-sm rounded-lg border border-gray-200">
                {formatValue("Owner", data.Record?.["Owner"])}
              </div>
            </div>

            {/* Resto de campos */}
            {Object.keys(fieldLabels).map((key) => {
              if (key === "FechaVigencia" || key === "HashDocumento" || key === "txId" || key === "Owner") {
                return null;
              }

              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {fieldLabels[key]}
                  </label>
                  <div
                    className={`
                      bg-gray-50 px-4 py-2.5 text-gray-800 text-sm rounded-lg border border-gray-200
                      ${key === "Estatus" ? "font-medium" : ""}
                      ${data.Record?.[key] === "Activo" ? "text-green-600" : ""}
                      ${data.Record?.[key] === "Inactivo" ? "text-red-600" : ""}
                    `}
                  >
                    {formatValue(key, data.Record?.[key])}
                  </div>
                </div>
              );
            })}

            {/* Fecha de Vigencia y Hash del Documento en la misma fila */}
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {fieldLabels["FechaVigencia"]}
                </label>
                <div className="bg-gray-50 px-4 py-2.5 text-gray-800 text-sm rounded-lg border border-gray-200">
                  {formatValue("FechaVigencia", data.Record?.["FechaVigencia"])}
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
