import React from 'react';
import { FileText, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../services/apiService';
import Swal from 'sweetalert2';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' 
          : 'text-gray-600 hover:bg-gray-100'
        }
        group font-medium text-sm
      `}
    >
      <div className={`
        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-yellow-500'}
        transition-colors duration-200
      `}>
        {icon}
      </div>
      <span>{text}</span>
    </button>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al cerrar sesión.',
      });
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-full min-h-screen w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-4 z-30">
      {/* Logo */}
      <div className="px-2 mb-8 flex-shrink-0">
        <img 
          src="src\assets\images\logo.png" 
          alt="Logo" 
          className="h-12 w-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <SidebarItem
          icon={<FileText size={20} />}
          text="Pagarés por confirmar"
          isActive={currentPath === '/dashboard'}
          onClick={() => handleNavigation('/dashboard')}
        />
        <SidebarItem
          icon={<FileText size={20} />}
          text="Mis pagarés"
          isActive={currentPath === '/owned-pagares'}
          onClick={() => handleNavigation('/owned-pagares')}
        />
        
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <SidebarItem
          icon={<LogOut size={20} />}
          text="Cerrar sesión"
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;