import React from 'react';
import { X, FileText } from 'lucide-react';

interface PagareDetail {
  _id: string;
  id: string;
  obj: {
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
}

interface PagareDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PagareDetail | null;
}

const PagareDetailsModal: React.FC<PagareDetailsModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen || !data) return null;

  const fieldLabels: { [key: string]: string } = {
    id: "ID del Pagaré",
    Montocredito: "Monto del Crédito",
    Plazo: "Plazo",
    FechaPrimerPago: "Fecha del Primer Pago",
    PorInteres: "Tasa de Interés (%)",
    PordeMoratorios: "Tasa Moratoria (%)",
    LugarCreacion: "Lugar de Creación",
    Desembolso: "Desembolso",
    Fecha: "Fecha de Creación",
    NumeroCliente: "Número de Cliente",
    CodigoCliente: "Código de Cliente",
    FechaVencimiento: "Fecha de Vencimiento",
    HashDocumento: "Hash del Documento",
    Owner: "Pagar a la orden de",
    Estatus: "Estatus"
  };

  const formatValue = (key: string, value: string) => {
    if (!value || value === "N/A") return "N/A";

    if (key === "Montocredito" || key === "Desembolso") {
      return `$${value}`;
    }

    if (key === "PorInteres" || key === "PordeMoratorios") {
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

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden transform transition-all"
        style={{ maxHeight: "85vh" }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-medium text-gray-900">
              Detalles del pagaré
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="px-6 py-6 overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 140px)" }}
        >
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">Estado</div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                data.obj.Estatus?.toLowerCase() === "activo" 
                  ? "bg-green-50 text-green-700" 
                  : "bg-red-50 text-red-700"
              }`}>
                {data.obj.Estatus}
              </div>
            </div>

            {/* ID y Owner */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">{fieldLabels["id"]}</div>
                <div className="font-mono text-sm text-gray-900 break-all">
                  {data.id}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">{fieldLabels["Owner"]}</div>
                <div className="text-sm text-gray-900">
                  {formatValue("Owner", data.obj.Owner)}
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Main Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(data.obj).map(([key, value]) => {
                if (key === "Owner" || key === "HashDocumento" || key === "Estatus") return null;

                return (
                  <div key={key}>
                    <div className="text-sm text-gray-500 mb-1">
                      {fieldLabels[key]}
                    </div>
                    <div className="text-sm text-gray-900 font-medium">
                      {formatValue(key, value)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hash */}
            <div className="pt-4">
              <div className="text-sm text-gray-500 mb-1">
                {fieldLabels["HashDocumento"]}
              </div>
              <div className="font-mono text-sm text-gray-900 break-all">
                {formatValue("HashDocumento", data.obj.HashDocumento)}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagareDetailsModal;