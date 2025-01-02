import React from 'react';
import Grid from '@mui/material/Grid';
import InputRecoveryField from '../atoms/InputRecoveryField';

interface RecoveryInputGridProps {
  values: string[];
  onChange: (index: number, value: string) => void;
}

const RecoveryInputGrid: React.FC<RecoveryInputGridProps> = ({ values, onChange }) => {
  return (
    <Grid container spacing={2}>
      {values.map((value, index) => (
        <Grid item xs={6} sm={4} key={index}>
          <InputRecoveryField
            value={value}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={`Palabra ${index + 1}`}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecoveryInputGrid;
