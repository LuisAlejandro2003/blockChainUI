import React from 'react';
import { Button2 } from '../atoms/Button2';
import { Badge } from '../atoms/Badge';

import { Loader2 } from 'lucide-react';

interface PagareRecord {
  Key: string;
  Record: {
    Fecha: string;
    LugarCreacion: string;
    Estatus: string;
  };
}

interface EndorseTableProps {
  data: PagareRecord[];
  isLoading: boolean;
  onEndorse: (id: string) => void;
}

export const EndorseTable: React.FC<EndorseTableProps> = ({
  data,
  isLoading,
  onEndorse,
}) => {
  return (
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
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay pagarés disponibles
                </td>
              </tr>
            ) : (
              data.map((item: PagareRecord) => (
                <tr
                  key={item.Key}
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
                    <Badge status={item.Record?.Estatus || "N/A"} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button2
                      onClick={() => onEndorse(item.Key)}
                      disabled={isLoading}
                    >
                      Endosar
                    </Button2>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};