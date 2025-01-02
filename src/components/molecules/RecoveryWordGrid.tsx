import React from "react";
import { Grid } from "@mui/material";
import RecoveryWordInput from "../atoms/RecoveryWordInput";

interface RecoveryWordGridProps {
  words: string[];
  onWordChange: (index: number, value: string) => void;
}

const RecoveryWordGrid: React.FC<RecoveryWordGridProps> = ({
  words,
  onWordChange,
}) => {
  return (
    <Grid container spacing={2}>
      {words.map((word, index) => (
        <Grid item xs={4} key={index}>
          <RecoveryWordInput
            label={`Palabra ${index + 1}`}
            value={word}
            onChange={(value) => onWordChange(index, value)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecoveryWordGrid;