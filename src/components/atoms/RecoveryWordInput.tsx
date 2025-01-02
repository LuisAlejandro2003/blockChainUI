import React from "react";
import { TextField } from "@mui/material";

interface RecoveryWordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const RecoveryWordInput: React.FC<RecoveryWordInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        style: { borderRadius: "8px", backgroundColor: "#F5F5F5" },
      }}
    />
  );
};

export default RecoveryWordInput;
