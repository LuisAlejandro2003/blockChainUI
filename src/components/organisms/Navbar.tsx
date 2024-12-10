import React, { useState } from 'react';
import { FaSearch, FaCopy } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full bg-white p-4 flex items-center">
      {/* Título del Panel */}
      {/*  <h1
        className="text-3xl font-semibold text-gray-800 ml-8"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Panel
      </h1>*/}

      {/* Barra de Búsqueda centrada */}
      <div className="relative mx-auto w-1/3">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full pl-10 pr-4 py-2 border rounded-full bg-[#F9FAFB] focus:outline-none"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFC565]" />
      </div>

      {/* Nombre del usuario con dropdown */}
      <div className="ml-auto mr-8 relative">
        <div
          className="flex items-center cursor-pointer text-gray-800 font-medium"
          onClick={toggleDropdown}
        >
          <span className="mr-2">Llave publica</span>
          <FaCopy />
        </div>


      </div>
    </div>
  );
};

export default Navbar;
