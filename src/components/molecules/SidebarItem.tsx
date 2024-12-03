import React from 'react';
import { IconType } from 'react-icons';

type SidebarItemProps = {
  icon: IconType;
  label: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-center p-4 cursor-pointer hover:bg-gray-100">
      <Icon className="mr-3 text-lg" />
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
