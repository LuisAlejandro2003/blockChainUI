import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Divider,
  CircularProgress,
} from '@mui/material';
import Swal from 'sweetalert2';
import { createPagare } from '../services/apiService';

// Esquema de validación
const validationSchema = yup.object({
  id: yup
    .string()
    .matches(/^PGE\d+$/, 'El ID debe comenzar con "PGE" seguido de un número')
    .required('El ID es obligatorio'),
  Owner: yup.string().required('El propietario es obligatorio'),
  Montocredito: yup
    .number()
    .positive('El monto del crédito debe ser mayor a 0')
    .required('El monto del crédito es obligatorio'),
  Plazo: yup
    .number()
    .integer('El plazo debe ser un número entero')
    .positive('El plazo debe ser mayor a 0')
    .required('El plazo es obligatorio'),
  PorInteres: yup
    .number()
    .positive('La tasa de interés debe ser mayor a 0')
    .required('La tasa de interés es obligatoria'),
  PordeMoratorios: yup
    .number()
    .positive('La tasa moratoria debe ser mayor a 0')
    .required('La tasa moratoria es obligatoria'),
  LugarCreacion: yup.string().required('El lugar de creación es obligatorio'),
  Desembolso: yup
    .number()
    .min(0, 'El monto del desembolso no puede ser negativo')
    .required('El monto del desembolso es obligatorio'),
  NumeroCliente: yup
    .string()
    .matches(/^\d{11}$/, 'El número del cliente debe tener 11 dígitos')
    .required('El número del cliente es obligatorio'),
  CodigoCliente: yup
    .string()
    .matches(/^\d{11}$/, 'El código del cliente debe tener 11 dígitos')
    .required('El código del cliente es obligatorio'),
  HashDocumento: yup.string().optional(),
});

const AddCreditAgreementForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      id: '',
      Owner: '',
      Montocredito: '',
      Plazo: '',
      PorInteres: '',
      PordeMoratorios: '',
      LugarCreacion: '',
      Desembolso: '',
      NumeroCliente: '',
      CodigoCliente: '',
      HashDocumento: '',
      FechaPrimerPago: '',
      Fecha: '',
      FechaVencimiento: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const obj = {
          Montocredito: values.Montocredito,
          Plazo: values.Plazo,
          FechaPrimerPago: values.FechaPrimerPago,
          PorInteres: values.PorInteres,
          PordeMoratorios: values.PordeMoratorios,
          LugarCreacion: values.LugarCreacion,
          Desembolso: values.Desembolso,
          Fecha: values.Fecha,
          NumeroCliente: values.NumeroCliente,
          CodigoCliente: values.CodigoCliente,
          FechaVencimiento: values.FechaVencimiento,
          HashDocumento: values.HashDocumento || 'N/A',
          Owner: values.Owner,
          Estatus: 'ACTIVO',
        };

        await createPagare(values.id, obj);
        Swal.fire('Éxito', 'Pagaré creado exitosamente', 'success');
        formik.resetForm();
      } catch (error) {
        Swal.fire('Error', 'No se pudo crear el pagaré. Intente nuevamente.', 'error');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          p: 4,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3, color: '#0E4A67' }}>
          Agregar Pagaré
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {/* Input de ID y Owner */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="id"
              name="id"
              label="ID del Pagaré"
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="Owner"
              name="Owner"
              label="Propietario"
              value={formik.values.Owner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Owner && Boolean(formik.errors.Owner)}
              helperText={formik.touched.Owner && formik.errors.Owner}
            />
          </Grid>
          {/* Otros inputs */}
          {[{ name: 'Montocredito', label: 'Monto del crédito' },
            { name: 'Plazo', label: 'Plazo en meses' },
            { name: 'PorInteres', label: 'Tasa de interés (%)' },
            { name: 'PordeMoratorios', label: 'Tasa moratoria (%)' },
            { name: 'LugarCreacion', label: 'Lugar de creación' },
            { name: 'Desembolso', label: 'Monto del desembolso' },
            { name: 'NumeroCliente', label: 'Número del cliente' },
            { name: 'CodigoCliente', label: 'Código del cliente' },
            { name: 'HashDocumento', label: 'Hash del documento' },
          ].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
             fullWidth
          id={field.name}
          name={field.name}
          label={field.label}
          value={(formik.values as any)[field.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched[field.name as keyof typeof formik.touched] &&
            Boolean(formik.errors[field.name as keyof typeof formik.errors])
          }
         helperText={
         formik.touched[field.name as keyof typeof formik.touched] &&
         formik.errors[field.name as keyof typeof formik.errors]
            }
          />
          </Grid>

          ))}
          {/* Fechas */}
          {[{ name: 'FechaPrimerPago', label: 'Fecha del primer pago' },
            { name: 'Fecha', label: 'Fecha de creación' },
            { name: 'FechaVencimiento', label: 'Fecha de vencimiento' },
          ].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                id={field.name}
                name={field.name}
                label={field.label}
                type="date"
                value={(formik.values as any)[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
  <Button
    type="button"
    variant="outlined"
    sx={{
      color: '#FF6600',
      borderColor: '#FF6600',
      '&:hover': { backgroundColor: '#FF6600', color: 'white' },
    }}
    onClick={() => formik.resetForm()}
  >
    Cancelar
  </Button>
  <Button
    type="submit"
    variant="contained"
    disabled={loading}
    sx={{
      backgroundColor: '#FF6600',
      color: 'white',
      '&:hover': { backgroundColor: '#E55A00' },
    }}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
  </Button>
</Box>

      </Box>
    </Container>
  );
};

export default AddCreditAgreementForm;
