import axios from "axios";
import { showErrorModal } from "../atoms/ErrorModal";
import { saveEncryptedData } from "../services/indexedDBService";
import { getEncryptedData } from "../services/indexedDBService";

// URL base para las solicitudes
const API_URL = "http://localhost:5005";

// Token estático para el ejemplo
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcmFwcDIiLCJpYXQiOjE3MzQzMzc4OTQsImV4cCI6MTczNDM0MTQ5NH0.YfBgaoS7XPFwYK6FsqatZiWNEurSLhSLDVcid6Dt9Xc";

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



// Servicio para crear un nuevo pagaré
export const createPagare = async (id: string, obj: Record<string, any>) => {
  try {
    const response = await axios.post(
      `${API_URL}/createone`,
      { id, obj },
      {
        headers: { Authorization: TOKEN },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error en createPagare:", error);
    const errorMessage =
      error.response?.data?.message || "Error al crear el pagaré.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};



export const fetchSeedWords = async () => {
  try {
    const response = await axios.get(`${API_URL}/words`);
    return response.data.message.split(' '); // Convertimos el string a un array de palabras
  } catch (error: any) {
    console.error("Error en fetchSeedWords:", error);
    const errorMessage =
      error.response?.data?.message || "Error al obtener las palabras de recuperación.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};


export const registerUserWithSeed = async (
  mnemonic: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/register`, { mnemonic, password });

    // Almacenar respuesta de /register en IndexedDB
    const { privateKey, publicKey } = response.data.response;
    await saveEncryptedData("registerData", { privateKey, publicKey });

    return response.data;
  } catch (error: any) {
    console.error("Error en registerUserWithSeed:", error);
    const errorMessage =
      error.response?.data?.message || "Error al registrar el usuario.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

export const postTest1 = async (
  encrypted: string,
  password: string,
  user: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/test1`, { encrypted, password, user });

    // Almacenar respuesta de /test1 en IndexedDB
    const { ciphers, signature, hash } = response.data;
    await saveEncryptedData("test1Data", { ciphers, signature, hash, user });

    return response.data;
  } catch (error: any) {
    console.error("Error en postTest1:", error);
    const errorMessage =
      error.response?.data?.message || "Error al procesar el endpoint test1.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};
