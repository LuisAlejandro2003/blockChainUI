import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface SeedPhraseDisplayProps {
  seedWords: string[];
}

const SeedPhraseDisplay: React.FC<SeedPhraseDisplayProps> = ({ seedWords }) => {
  return (
    <Grid container spacing={2}>
      {seedWords.map((word, index) => (
        <Grid item xs={4} key={index}>
          <Paper
            elevation={1}
            sx={{
              padding: 2,
              textAlign: 'center',
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: '#F7FAFC',
              color: '#0E4A67',
            }}
          >
            {index + 1}. {word}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SeedPhraseDisplay;
