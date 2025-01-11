import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { createPagare } from '../services/apiService';

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

  const inputClasses = `
    w-full px-4 py-2.5 rounded-lg border border-gray-300
    focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
    bg-white text-gray-900 transition-colors duration-200
  `;

  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form 
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Agregar Pagaré
            </h1>
            <p className="mt-2 text-gray-600">
              Complete todos los campos requeridos para crear un nuevo pagaré
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID y Owner - Full width */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                  ID del Pagaré
                </label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  className={inputClasses}
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.id && formik.errors.id && (
                  <div className={errorClasses}>{formik.errors.id}</div>
                )}
              </div>

              <div>
                <label htmlFor="Owner" className="block text-sm font-medium text-gray-700 mb-1">
                  Propietario
                </label>
                <input
                  id="Owner"
                  name="Owner"
                  type="text"
                  className={inputClasses}
                  value={formik.values.Owner}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Owner && formik.errors.Owner && (
                  <div className={errorClasses}>{formik.errors.Owner}</div>
                )}
              </div>
            </div>

            {/* Campos numéricos */}
            {[
              { name: 'Montocredito', label: 'Monto del crédito' },
              { name: 'Plazo', label: 'Plazo en meses' },
              { name: 'PorInteres', label: 'Tasa de interés (%)' },
              { name: 'PordeMoratorios', label: 'Tasa moratoria (%)' },
              { name: 'Desembolso', label: 'Monto del desembolso' },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  className={inputClasses}
                  value={formik.values[field.name as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field.name as keyof typeof formik.touched] && 
                 formik.errors[field.name as keyof typeof formik.errors] && (
                  <div className={errorClasses}>
                    {formik.errors[field.name as keyof typeof formik.errors]?.toString()}
                  </div>
                )}
              </div>
            ))}

            {/* Campos de texto */}
            {[
              { name: 'LugarCreacion', label: 'Lugar de creación' },
              { name: 'NumeroCliente', label: 'Número del cliente' },
              { name: 'CodigoCliente', label: 'Código del cliente' },
              { name: 'HashDocumento', label: 'Hash del documento' },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  className={inputClasses}
                  value={formik.values[field.name as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field.name as keyof typeof formik.touched] && 
                 formik.errors[field.name as keyof typeof formik.errors] && (
                  <div className={errorClasses}>
                    {formik.errors[field.name as keyof typeof formik.errors]?.toString()}
                  </div>
                )}
              </div>
            ))}

            {/* Fechas */}
            {[
              { name: 'FechaPrimerPago', label: 'Fecha del primer pago' },
              { name: 'Fecha', label: 'Fecha de creación' },
              { name: 'FechaVencimiento', label: 'Fecha de vencimiento' },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="date"
                  className={inputClasses}
                  value={formik.values[field.name as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="px-6 py-2.5 rounded-lg text-yellow-600 border border-yellow-600
                hover:bg-yellow-50 transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-yellow-500 text-white font-medium
                hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50
                disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreditAgreementForm;