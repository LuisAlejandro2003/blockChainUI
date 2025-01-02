import React from 'react';
import TextField from '@mui/material/TextField';

interface InputRecoveryFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputRecoveryField: React.FC<InputRecoveryFieldProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder || "Palabra"}
      value={value}
      onChange={onChange}
      fullWidth
      inputProps={{
        style: { textAlign: 'center', fontSize: '1rem', padding: '10px' },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: '#888',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
      }}
    />
  );
};

export default InputRecoveryField;
