
import React from 'react';
import Table from '../organisms/Table';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Table />
    </div>
  );
};

export default Dashboard;
