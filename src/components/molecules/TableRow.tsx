import React from 'react';
import Button from '../atoms/Button';

type TableRowProps = {
  noPagare: string;
  fecha: string;
  ubicacion: string;
  estatus: string;
  onClickDetalles: () => void;
};

const TableRow: React.FC<TableRowProps> = ({ noPagare, fecha, ubicacion, estatus, onClickDetalles }) => {
  const estatusColor = estatus === 'Activo' ? 'text-[#0B8A00]' : 'text-[#C71026]';

  return (
    <tr className="hover:bg-[#F9FAFB] transition-all">
      <td className="px-4 py-3 font-regular text-[#232323]">{noPagare}</td>
      <td className="px-4 py-3 font-regular text-[#232323]">{fecha}</td>
      <td className="px-4 py-3 font-regular text-[#232323]">{ubicacion}</td>
      <td className={`px-4 py-3 font-semibold ${estatusColor}`}>
        {estatus}
      </td>
      <td className="px-4 py-3">
        <Button onClick={onClickDetalles} className="border-orange-300 text-orange-500">
          Detalles
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
