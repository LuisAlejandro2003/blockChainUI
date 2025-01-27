import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { createPagare } from '../services/apiService';
import { useLocation } from 'react-router-dom';

interface FormValues {
  id: string;
  Owner: string;
  Montocredito: string;
  Plazo: string;
  PorInteres: string;
  PordeMoratorios: string;
  LugarCreacion: string;
  Desembolso: string;
  NumeroCliente: string;
  CodigoCliente: string;
  HashDocumento: string;
  FechaPrimerPago: string;
  Fecha: string;
  FechaVencimiento: string;
}

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
    .matches(/^\d+$/, 'El número del crédito debe contener solo dígitos')
    .required('El número del crédito es obligatorio'),
  CodigoCliente: yup
    .string()
    .matches(/^\d+$/, 'El código del cliente debe contener solo dígitos')
    .required('El código del cliente es obligatorio'),
  HashDocumento: yup.string().optional(),
});

const AddCreditAgreementForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [plazoPeriodicidad, setPlazoPeriodicidad] = React.useState('mensual');
  const location = useLocation();
  const receivedData = location.state?.formData;

  // Obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      id: receivedData?.id || '',
      Owner: receivedData?.Owner || '041adae6e04383f75d734b6fbcdf21e445ae411d332cfaf5c0b7237a89849277192c8faf53fe79cf05af443aa9d9eddcad44b4ca3950be695121c6f8038e82520a',
      Montocredito: receivedData?.Montocredito || '',
      Plazo: receivedData?.Plazo || '',
      PorInteres: receivedData?.PorInteres || '',
      PordeMoratorios: receivedData?.PordeMoratorios || '',
      LugarCreacion: receivedData?.LugarCreacion || '',
      Desembolso: receivedData?.Desembolso || '0',
      NumeroCliente: receivedData?.NumeroCliente || '',
      CodigoCliente: receivedData?.CodigoCliente || '',
      HashDocumento: receivedData?.HashDocumento || '',
      FechaPrimerPago: receivedData?.FechaPrimerPago || '',
      Fecha: getCurrentDate(),
      FechaVencimiento: receivedData?.FechaVencimiento || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const obj = {
          Montocredito: values.Montocredito,
          Plazo: `${values.Plazo} ${plazoPeriodicidad}`,
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

        console.log('Datos a enviar:', obj);
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

  // Establecer la periodicidad si viene en los datos recibidos
  React.useEffect(() => {
    if (receivedData?.Plazo) {
      const [_, periodicidad] = receivedData.Plazo.split(' ');
      if (periodicidad) {
        setPlazoPeriodicidad(periodicidad.toLowerCase());
      }
    }
  }, [receivedData]);

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID y Owner - Full width */}
            <div className="md:col-span-2 space-y-4">
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
                  Pagar a la orden de
                </label>
                <input
                  id="Owner"
                  name="Owner"
                  type="text"
                  className={`${inputClasses} bg-gray-100`}
                  value="Alsol Contigo, S.A. de C.V., SOFOM, E.N.R."
                  readOnly
                  onChange={(e) => {
                    formik.setFieldValue('Owner', '041adae6e04383f75d734b6fbcdf21e445ae411d332cfaf5c0b7237a89849277192c8faf53fe79cf05af443aa9d9eddcad44b4ca3950be695121c6f8038e82520a');
                  }}
                />
                {formik.touched.Owner && formik.errors.Owner && (
                  <div className={errorClasses}>{formik.errors.Owner}</div>
                )}
              </div>
            </div>

            {/* Campos numéricos en dos columnas */}
            <div>
              <label htmlFor="Montocredito" className="block text-sm font-medium text-gray-700 mb-1">
                Bueno por
              </label>
              <input
                id="Montocredito"
                name="Montocredito"
                type="number"
                className={inputClasses}
                value={formik.values.Montocredito}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Montocredito && formik.errors.Montocredito && (
                <div className={errorClasses}>{formik.errors.Montocredito}</div>
              )}
            </div>

            <div>
              <label htmlFor="PorInteres" className="block text-sm font-medium text-gray-700 mb-1">
                Tasa de interés (%)
              </label>
              <input
                id="PorInteres"
                name="PorInteres"
                type="number"
                className={inputClasses}
                value={formik.values.PorInteres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.PorInteres && formik.errors.PorInteres && (
                <div className={errorClasses}>{formik.errors.PorInteres}</div>
              )}
            </div>

            <div>
              <label htmlFor="PordeMoratorios" className="block text-sm font-medium text-gray-700 mb-1">
                Tasa moratoria (%)
              </label>
              <input
                id="PordeMoratorios"
                name="PordeMoratorios"
                type="number"
                className={inputClasses}
                value={formik.values.PordeMoratorios}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.PordeMoratorios && formik.errors.PordeMoratorios && (
                <div className={errorClasses}>{formik.errors.PordeMoratorios}</div>
              )}
            </div>

            {/* Plazo y Periodicidad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Plazo" className="block text-sm font-medium text-gray-700 mb-1">
                  Plazo en meses
                </label>
                <input
                  id="Plazo"
                  name="Plazo"
                  type="number"
                  className={inputClasses}
                  value={formik.values.Plazo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Plazo && formik.errors.Plazo && (
                  <div className={errorClasses}>{formik.errors.Plazo}</div>
                )}
              </div>
              <div>
                <label htmlFor="periodicidad" className="block text-sm font-medium text-gray-700 mb-1">
                  Periodicidad
                </label>
                <select
                  id="periodicidad"
                  value={plazoPeriodicidad}
                  onChange={(e) => setPlazoPeriodicidad(e.target.value)}
                  className={inputClasses}
                >
                  <option value="semanal">Semanal</option>
                  <option value="catorcenal">Catorcenal</option>
                  <option value="mensual">Mensual</option>
                </select>
              </div>
            </div>

            {/* Número y Código del cliente */}
            <div>
              <label htmlFor="NumeroCliente" className="block text-sm font-medium text-gray-700 mb-1">
                Número del crédito
              </label>
              <input
                id="NumeroCliente"
                name="NumeroCliente"
                type="text"
                pattern="\d*"
                className={inputClasses}
                value={formik.values.NumeroCliente}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.NumeroCliente && formik.errors.NumeroCliente && (
                <div className={errorClasses}>{formik.errors.NumeroCliente}</div>
              )}
            </div>

            <div>
              <label htmlFor="CodigoCliente" className="block text-sm font-medium text-gray-700 mb-1">
                Código del cliente
              </label>
              <input
                id="CodigoCliente"
                name="CodigoCliente"
                type="text"
                pattern="\d*"
                className={inputClasses}
                value={formik.values.CodigoCliente}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.CodigoCliente && formik.errors.CodigoCliente && (
                <div className={errorClasses}>{formik.errors.CodigoCliente}</div>
              )}
            </div>

            {/* Hash del documento */}
            <div className="md:col-span-2">
              <label htmlFor="HashDocumento" className="block text-sm font-medium text-gray-700 mb-1">
                Hash del documento
              </label>
              <input
                id="HashDocumento"
                name="HashDocumento"
                type="text"
                className={inputClasses}
                value={formik.values.HashDocumento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.HashDocumento && formik.errors.HashDocumento && (
                <div className={errorClasses}>{formik.errors.HashDocumento}</div>
              )}
            </div>

            {/* Lugar y Fecha de Creación */}
            <div>
              <label htmlFor="LugarCreacion" className="block text-sm font-medium text-gray-700 mb-1">
                Lugar de creación
              </label>
              <input
                id="LugarCreacion"
                name="LugarCreacion"
                type="text"
                className={inputClasses}
                value={formik.values.LugarCreacion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.LugarCreacion && formik.errors.LugarCreacion && (
                <div className={errorClasses}>{formik.errors.LugarCreacion}</div>
              )}
            </div>

            <div>
              <label htmlFor="Fecha" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de creación
              </label>
              <input
                id="Fecha"
                name="Fecha"
                type="date"
                className={inputClasses}
                value={formik.values.Fecha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
              />
            </div>

            {/* Fechas de Primer Pago y Vencimiento */}
            <div>
              <label htmlFor="FechaPrimerPago" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha del primer pago
              </label>
              <input
                id="FechaPrimerPago"
                name="FechaPrimerPago"
                type="date"
                className={inputClasses}
                value={formik.values.FechaPrimerPago}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <label htmlFor="FechaVencimiento" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de vencimiento
              </label>
              <input
                id="FechaVencimiento"
                name="FechaVencimiento"
                type="date"
                className={inputClasses}
                value={formik.values.FechaVencimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
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