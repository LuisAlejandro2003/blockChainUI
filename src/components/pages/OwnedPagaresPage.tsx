import React from "react";
import OwnedPagaresTable from "../organisms/OwnedPagaresTable";

const OwnedPagaresPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Pagarés</h1>
        <p className="mt-2 text-sm text-gray-600">
          Visualiza y gestiona los pagarés de los cuales eres propietario en la blockchain
        </p>
      </div>
      <OwnedPagaresTable />
    </div>
  );
};

export default OwnedPagaresPage;