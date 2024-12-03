// src/services/apiService.ts
import axios from 'axios';

// URL base para las solicitudes
const API_URL = 'http://localhost:5005';

// Token estático para el ejemplo
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcmFwcDIiLCJpYXQiOjE3MzMyMDU0NDksImV4cCI6MTczMzIwOTA0OX0.zHBrRbXKH0RPHlOyVVHwwAbpGhNJI52hOqwmMw-AlpA'; // Reemplaza con tu token válido

// Servicio para obtener todos los pagarés
export const fetchAllPagares = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/getAll`,
      {},
      {
        headers: { Authorization: TOKEN }, // Uso del token centralizado
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error en fetchAllPagares:', error);
    throw new Error('Error al obtener los pagarés.');
  }
};

// Servicio para obtener los detalles de un pagaré por ID
export const fetchPagareDetails = async (id: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/gethistoryone`,
      { id },
      {
        headers: { Authorization: TOKEN },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error('Error en fetchPagareDetails:', error);
    throw new Error('Error al obtener los detalles del pagaré.');
  }
};
