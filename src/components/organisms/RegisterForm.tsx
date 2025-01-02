import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import RecoveryInputGrid from "../molecules/RecoveryInputGrid";
import { registerUserWithSeed, postTest1 } from "../services/apiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  seedWords: string[];
}

const RegisterForm: React.FC<RegisterFormProps> = ({ seedWords }) => {
  const [words, setWords] = useState<string[]>(seedWords);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    const mnemonic = words.join(" ");

    try {
      // Paso 1: Registrar al usuario
      const registerResponse = await registerUserWithSeed(mnemonic, newPassword);
      const { privateKey, publicKey } = registerResponse.response;

      // Paso 2: Llamar a /test1
      const test1Response = await postTest1(privateKey, newPassword, publicKey);

      // Confirmación de registro exitoso
      Swal.fire({
        icon: "success",
        title: "Registrado",
        text: "Usuario registrado correctamente.",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar registrar el usuario.",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ddd",
              width: 20,
              height: 20,
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              height: 2,
              backgroundColor: "#FF8C00",
              flexGrow: 1,
              mx: 1,
            }}
          />
          <Box
            sx={{
              backgroundColor: "#FF8C00",
              width: 20,
              height: 20,
              borderRadius: "50%",
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ color: "#0E4A67", mb: 2 }}
      >
        Crear Cuenta
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Ingresa las 12 palabras para confirmar y crear tu cuenta.
      </Typography>

      <RecoveryInputGrid values={words} onChange={handleInputChange} />

      <Grid container spacing={2} mt={4} alignItems="center">
        <Grid item xs={4}>
          <TextField
            type="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              style: { borderRadius: "8px" },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="password"
            label="Confirmar contraseña"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              style: { borderRadius: "8px" },
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
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
