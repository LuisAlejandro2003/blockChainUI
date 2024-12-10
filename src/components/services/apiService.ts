import axios from "axios";
import { showErrorModal } from "../atoms/ErrorModal";

// URL base para las solicitudes
const API_URL = "http://localhost:5005";

// Token estático para el ejemplo
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcmFwcDIiLCJpYXQiOjE3MzM1MDk3MzcsImV4cCI6MTczMzUxMzMzN30.aKjP9NTgEHt80amgo4Erl_9TFKgwBpyJeUrQGcX9NmY";

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
  } catch (error: any) {
    console.error("Error en fetchAllPagares:", error);
    const errorMessage =
      error.response?.data?.message || "Error al obtener los pagarés.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
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
  } catch (error: any) {
    console.error("Error en fetchPagareDetails:", error);
    const errorMessage =
      error.response?.data?.message ||
      "Error al obtener los detalles del pagaré.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

// Servicio para actualizar el propietario de un pagaré
export const updatePagareOwner = async (id: string, newOwner: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/updateoneowner`,
      { id, new: newOwner },
      {
        headers: { Authorization: TOKEN },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error en updatePagareOwner:", error);
    const errorMessage =
      error.response?.data?.message ||
      "Error al actualizar el propietario del pagaré.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};