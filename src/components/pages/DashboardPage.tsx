// src/components/pages/DashboardPage.tsx
import React from "react";
import Sidebar from "../organisms/Sidebar";
import Navbar from "../organisms/Navbar";
import Table from "../organisms/Table";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
      

        {/* Page content */}
        <div className="p-6 ">
      
          <Table />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
