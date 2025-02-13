import React from "react";
import { X, FileText, History, Clock } from "lucide-react";

interface PagareDetail {
  Record: {
    BuenoPor: string;
    Plazo: string;
    DesPlazo: string;
    TasaInteres: string;
    TasaInteresMoratorio: string;
    LugarDesembolso: string;
    FechaDesembolso: string;
    FechaVigencia: string;
    FechaPrimerPago: string;
    NumeroCredito: string;
    CodigoCliente: string;
    HashDocumento: string;
    Owner: string;
    Estatus: string;
  };
  txId: string;
  timestamp: string;
  isDelete: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PagareDetail | null;
  history: PagareDetail[];
  fondeador: string;
  setFondeador: (value: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  history = []
}) => {
  if (!isOpen || !data) return null;

  const currentState = data;

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

  const formatValue = (key: string, value: string | number | undefined): string => {
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

    return String(value);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/Mexico_City'
    });
  };

  const getOperationType = (item: PagareDetail, previousItem?: PagareDetail) => {
    if (item.isDelete) return { label: "Eliminado", style: "bg-red-50 text-red-700" };
    
    if (!previousItem) return { label: "Creado", style: "bg-green-50 text-green-700" };
    
    if (item.Record.Owner !== previousItem.Record.Owner) {
      return { label: "Endosado", style: "bg-purple-50 text-purple-700" };
    }
    
    if (item.Record.Estatus !== previousItem.Record.Estatus) {
      return { label: "Cambio de Estado", style: "bg-yellow-50 text-yellow-700" };
    }

    return { label: "Actualizado", style: "bg-blue-50 text-blue-700" };
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
              <div className="text-sm text-gray-500">Estado en Blockchain</div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                !currentState.isDelete ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                {currentState.isDelete ? "Eliminado" : "Activo"}
              </div>
            </div>

            {/* ID de Transacción y Owner */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">{fieldLabels["txId"]}</div>
                <div className="font-mono text-sm text-gray-900 break-all">
                  {currentState.txId}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">{fieldLabels["Owner"]}</div>
                <div className="text-sm text-gray-900">
                  {formatValue("Owner", currentState.Record?.Owner)}
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Main Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(fieldLabels).map(([key, label]) => {
                if (key === "Owner" || key === "HashDocumento" || key === "txId" || key === "Estatus") return null;

                return (
                  <div key={key}>
                    <div className="text-sm text-gray-500 mb-1">
                      {label}
                    </div>
                    <div className="text-sm text-gray-900 font-medium">
                      {formatValue(key, currentState.Record?.[key as keyof typeof currentState.Record])}
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
                {formatValue("HashDocumento", currentState.Record?.HashDocumento)}
              </div>
            </div>

            {/* Historial de Cambios */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-medium text-gray-900">Historial de Cambios</h3>
              </div>
              <div className="space-y-4">
                {history.map((item, index) => {
                  const previousItem = history[index + 1];
                  const operationType = getOperationType(item, previousItem);
                  
                  return (
                    <div key={item.txId} className="border border-gray-200 rounded-lg p-4">
                      {/* Encabezado del historial */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${operationType.style}`}>
                          {operationType.label}
                        </span>
                      </div>

                      {/* ID de Transacción */}
                      <div className="mb-3">
                        <div className="text-sm text-gray-500">ID de Transacción:</div>
                        <div className="text-sm font-mono text-gray-900">{item.txId}</div>
                      </div>

                      {/* Pagar a la orden de */}
                      <div className="mb-3">
                        <div className="text-sm text-gray-500">Pagar a la orden de:</div>
                        <div className="text-sm text-gray-900">
                          {formatValue("Owner", item.Record.Owner)}
                        </div>
                      </div>

                      {/* Estado de eliminación */}
                      {item.isDelete && (
                        <div className="text-sm text-red-600 font-medium">
                          Registro eliminado
                        </div>
                      )}
                    </div>
                  );
                })}
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

export default Modal;
