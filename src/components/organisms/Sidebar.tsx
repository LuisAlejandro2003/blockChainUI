import React from 'react';
import { FileText, Repeat2, LogOut, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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

  return (
    <div className="h-screen bg-white border-r border-gray-200 flex flex-col w-64 py-6 px-4">
      {/* Logo */}
      <div className="px-2 mb-8">
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
          text="Ver pagarés"
          isActive={currentPath === '/dashboard'}
          onClick={() => handleNavigation('/dashboard')}
        />
        <SidebarItem
          icon={<Plus size={20} />}
          text="Crear pagaré"
          isActive={currentPath === '/add-credit-agreement'}
          onClick={() => handleNavigation('/add-credit-agreement')}
        />
     {/*<SidebarItem
          icon={<Repeat2 size={20} />}
          text="Endosar"
          isActive={currentPath === '/endose'}
          onClick={() => handleNavigation('/endose')}
        /> */}
      </nav>

      {/* Footer */}
      <div className="pt-6 mt-6 border-t border-gray-200">
        <SidebarItem
          icon={<LogOut size={20} />}
          text="Cerrar sesión"
          onClick={() => console.log('Logout clicked')}
        />
      </div>
    </div>
  );
};

export default Sidebar;