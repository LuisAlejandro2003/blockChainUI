import React, { useEffect } from 'react';
import Sidebar from '../organisms/Sidebar';
import Navbar from '../organisms/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Cleanup function para asegurar que no haya efectos residuales
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 