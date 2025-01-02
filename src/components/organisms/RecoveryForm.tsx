import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RecoveryInputGrid from '../molecules/RecoveryInputGrid';
import TextField from '@mui/material/TextField';

const RecoveryForm: React.FC = () => {
  const [words, setWords] = useState<string[]>(Array(12).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Palabras ingresadas:', words);
    console.log('Nueva contraseña:', newPassword);

    alert('Contraseña restablecida correctamente.');
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      {/* Título */}
      <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{ color: '#0E4A67', mb: 2 }}>
        Recuperación de Contraseña
      </Typography>
      <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ mb: 4 }}>
        Ingresa las 12 palabras de recuperación y configura tu nueva contraseña.
      </Typography>

      {/* Grid de Palabras */}
      <RecoveryInputGrid values={words} onChange={handleInputChange} />

      {/* Inputs de Nueva Contraseña y Confirmar Contraseña */}
      <Grid container spacing={2} mt={4} alignItems="center">
        <Grid item xs={4}>
          <TextField
            type="password"
            label="Nueva Contraseña"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              style: { borderRadius: '8px' },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="password"
            label="Confirmar Contraseña"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              style: { borderRadius: '8px' },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#FF8C00",
              color: "#fff",
              textTransform: "none",
              borderRadius: "8px",
              px: 4,
              "&:hover": {
                backgroundColor: "#e07b00",
              },
            }}
          >
            Restablecer
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecoveryForm;