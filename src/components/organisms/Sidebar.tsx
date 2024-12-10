import React from "react";
import {
  FaSignOutAlt,
  FaFileInvoice,
  FaExchangeAlt,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen p-6 bg-white flex flex-col items-start">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-20" />
      </div>

      {/* Botón Ver Pagarés */}
      <div className="w-full mb-6">
        <div className="flex items-center p-3 bg-[#FFC565] text-white rounded-lg cursor-pointer w-full">
          <FaFileInvoice className="mr-2" />
          <span>Ver pagarés</span>
        </div>
      </div>

      {/* Elementos del Sidebar */}
      <div className="w-full mb-4">
        <div className="flex items-center text-gray-800 p-3 hover:bg-gray-100 rounded-lg w-full cursor-pointer">
          <FaExchangeAlt className="mr-2" />
          <span style={{ fontFamily: "Poppins, sans-serif" }}>Endosar</span>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center text-gray-800 p-3 hover:bg-gray-100 rounded-lg w-full cursor-pointer">
          <FaSignOutAlt className="mr-2" />
          <span style={{ fontFamily: "Poppins, sans-serif" }}>Salir</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
