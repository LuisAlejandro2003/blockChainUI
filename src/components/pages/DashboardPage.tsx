import React from 'react';
import Sidebar from '../organisms/Sidebar';
import Navbar from '../organisms/Navbar';
import Table from '../organisms/Table';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex bg-[#FAFBFC] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
