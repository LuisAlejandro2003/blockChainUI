import React from 'react';
import RecoveryForm from '../organisms/RecoveryForm';
import Box from '@mui/material/Box';

const RecoveryPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        p: 2,
      }}
    >
      <RecoveryForm />
    </Box>
  );
};

export default RecoveryPage;
