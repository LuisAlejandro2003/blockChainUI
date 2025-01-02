import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FaCopy } from 'react-icons/fa';

interface AccountCreationStepOneProps {
  seedWords: string[];
  onNext: () => void;
}

const AccountCreationStepOne: React.FC<AccountCreationStepOneProps> = ({ seedWords, onNext }) => {
  const handleCopyToClipboard = () => {
    const seedPhrase = seedWords.join(' ');
    navigator.clipboard.writeText(seedPhrase);
    alert('Frase secreta copiada al portapapeles.');
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
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#FF8C00',
              width: 20,
              height: 20,
              borderRadius: '50%',
            }}
          />
          <Box
            sx={{
              height: 2,
              backgroundColor: '#FF8C00',
              flexGrow: 1,
              mx: 1,
            }}
          />
          <Box
            sx={{
              backgroundColor: '#ddd',
              width: 20,
              height: 20,
              borderRadius: '50%',
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ color: '#0E4A67', mb: 2 }}
      >
        Anota tu frase secreta
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Guarda las 12 palabras en un lugar seguro. Estas palabras son la clave
        para recuperar tu cuenta.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {seedWords.map((word, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                p: 1.5,
                border: '1px solid #ddd',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#0E4A67',
                fontWeight: 'bold',
              }}
            >
              {index + 1}. {word}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={handleCopyToClipboard}
          startIcon={<FaCopy />}
          sx={{
            color: '#0E4A67',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Copiar frase secreta
        </Button>
        <Button
          onClick={onNext}
          variant="contained"
          sx={{
            backgroundColor: '#FF8C00',
            color: '#fff',
            textTransform: 'none',
            borderRadius: '8px',
            px: 4,
            '&:hover': {
              backgroundColor: '#e07b00',
            },
          }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default AccountCreationStepOne;