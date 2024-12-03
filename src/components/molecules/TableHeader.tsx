import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr>
        <th className="px-4 py-2 text-left text-[#718EBF] font-medium">No. Pagaré</th>
        <th className="px-4 py-2 text-left text-[#718EBF] font-medium">Fecha</th>
        <th className="px-4 py-2 text-left text-[#718EBF] font-medium">Ubicación</th>
        <th className="px-4 py-2 text-left text-[#718EBF] font-medium">Estatus</th>
        <th className="px-4 py-2 text-left text-[#718EBF] font-medium">Acción</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
