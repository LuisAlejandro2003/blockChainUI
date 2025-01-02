import React from 'react';
import Sidebar from '../organisms/Sidebar';
import AddCreditAgreementForm from '../organisms/AddCreditAgreementForm';

const AddCreditAgreementPage: React.FC = () => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1">
     
        <main className="flex-1 p-6">
          <AddCreditAgreementForm />
        </main>
      </div>
    </div>
  );
};

export default AddCreditAgreementPage;