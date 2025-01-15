import axios from "axios";
import { showErrorModal } from "../atoms/ErrorModal";
import { saveDataToDB, getDataFromDB } from "./indexedDBService";
import CryptoJS from "crypto-js";
import { ec as EC } from "elliptic";
import { createHash, createCipheriv } from "crypto-browserify";
import { Buffer } from 'buffer/';

// Configuración
const API_URL = "http://localhost:5005";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// Obtener la clave pública del servidor desde variables de entorno
const SERVER_KEY_PUBLIC = import.meta.env.VITE_SERVER_KEY_PUBLIC;

if (!SERVER_KEY_PUBLIC) {
  throw new Error("La clave pública del servidor no está configurada en las variables de entorno");
}

interface PagareData {
  Montocredito: string;
  Plazo: string;
  FechaPrimerPago: string;
  PorInteres: string;
  PordeMoratorios: string;
  LugarCreacion: string;
  Desembolso: string;
  Fecha: string;
  NumeroCliente: string;
  CodigoCliente: string;
  FechaVencimiento: string;
  HashDocumento: string;
  Owner: string;
  Estatus: string;
}

export const generateEncryptedData = async (messageObject: any) => {
  try {
    // Obtener usuario activo de IndexedDB
    const registerData = await getDataFromDB("registerData");
    if (!registerData || !Array.isArray(registerData)) {
      console.error("No se encontraron datos en IndexedDB");
      throw new Error("No se encontraron datos en IndexedDB");
    }

    const activeUser = registerData.find(account => account.isActive);
    if (!activeUser || !activeUser.encrypted || !activeUser.password) {
      console.error("No se encontraron las credenciales necesarias del usuario activo");
      throw new Error("No se encontraron las credenciales necesarias del usuario activo");
    }

    const PRIVATE_KEY = activeUser.encrypted;
    const PASSWORD = activeUser.password;

    console.log("Valores obtenidos de IndexedDB en generateEncryptedData:");
    console.log("PRIVATE_KEY:", PRIVATE_KEY);
    console.log("PASSWORD:", PASSWORD);
    console.log("SERVER_KEY_PUBLIC:", SERVER_KEY_PUBLIC);
    console.log("Mensaje a encriptar:", messageObject);

    //pasar la llave publica del user 
    const passwordHash = createHash("sha256").update(PASSWORD).digest("hex");
    
    const privateKeyC = CryptoJS.AES.decrypt(PRIVATE_KEY, passwordHash).toString(CryptoJS.enc.Utf8);

    if (!privateKeyC) {
      throw new Error("Error al desencriptar la llave privada: Resultado vacío o nulo.");
    }

    const e = new EC("p256");
    const recipientPublicKey = e.keyFromPublic(SERVER_KEY_PUBLIC, "hex");
    const senderPrivateKey = e.keyFromPrivate(privateKeyC, "hex");

    const sharedKey = senderPrivateKey.derive(recipientPublicKey.getPublic());
    const sharedKeyHash = createHash("sha256").update(sharedKey.toString(16)).digest();

    const keyPair = e.keyFromPrivate(privateKeyC, "hex");

    // Convertir el objeto a string JSON
    const jsonString = JSON.stringify(messageObject);

    const hash = createHash("sha256").update(jsonString).digest("hex");
    const signature = keyPair.sign(hash, "hex");
    const signatureHex = signature.toDER("hex");

    // Crear un buffer de ceros para el IV usando el paquete buffer
    const iv = Buffer.alloc(16, 0);
    const cipher = createCipheriv("aes-256-gcm", Buffer.from(sharedKeyHash), iv);
    let encrypted = cipher.update(jsonString, "utf8", "hex");
    encrypted += cipher.final("hex");

    const publicKey = senderPrivateKey.getPublic("hex");

    return { ciphers: encrypted, signature: signatureHex, hash, user: publicKey };
  } catch (error) {
    console.error("Error en generateEncryptedData:", error);
    throw error;
  }
};

// Servicio para obtener todos los pagarés
export const fetchAllPagares = async (): Promise<any> => {
  try {
    const encryptedData = await generateEncryptedData({});

    console.log("Valores generados por generateEncryptedData:");
    console.log("Ciphers:", encryptedData.ciphers);
    console.log("Signature:", encryptedData.signature);
    console.log("Hash:", encryptedData.hash);
    console.log("User:", encryptedData.user);

    console.log("Cuerpo enviado a /getAll:");
    console.log(JSON.stringify(encryptedData, null, 2));

    const response = await axios.post(
      `${API_URL}/getAll`,
      encryptedData,
      {
        headers: DEFAULT_HEADERS,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error detallado en fetchAllPagares:", error);
    if (error.response) {
      console.log("Respuesta de error completa:", error.response.data);
    }
    const errorMessage = error.response?.data?.response?.message || 
                        error.response?.data?.message || 
                        error.message;
    throw new Error(errorMessage);
  }
};

// Servicio para obtener los detalles de un pagaré por ID
export const fetchPagareDetails = async (id: string) => {
  try {
    const encryptedData = await generateEncryptedData({ id });
    console.log("Datos encriptados generados:", encryptedData);

    const response = await axios.post(
      `${API_URL}/gethistoryone`,
      encryptedData,
      {
        headers: DEFAULT_HEADERS
      }
    );

    console.log("Respuesta de gethistoryone:", response.data);

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }

    return response.data;
  } catch (error: any) {
    console.error("Error en fetchPagareDetails:", error);
    const errorMessage = error.response?.data?.response?.message || 
                        error.response?.data?.message || 
                        error.message;
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

// Servicio para actualizar el propietario de un pagaré
export const updatePagareOwner = async (id: string, newOwner: string) => {
  try {
    const encryptedData = await generateEncryptedData({ id, new: newOwner });
    const response = await axios.post(
      `${API_URL}/updateoneowner`,
      encryptedData,
      {
        headers: DEFAULT_HEADERS
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error en updatePagareOwner:", error);
    const errorMessage = error.response?.data?.response?.message || 
                        error.response?.data?.message || 
                        error.message;
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

// Servicio para crear un nuevo pagaré
export const createPagare = async (id: string, obj: PagareData) => {
  try {
    // Asegurarnos de que todos los campos sean strings
    const formattedObj = {
      Montocredito: String(obj.Montocredito),
      Plazo: String(obj.Plazo),
      FechaPrimerPago: String(obj.FechaPrimerPago || "0"),
      PorInteres: String(obj.PorInteres),
      PordeMoratorios: String(obj.PordeMoratorios),
      LugarCreacion: String(obj.LugarCreacion),
      Desembolso: String(obj.Desembolso),
      Fecha: String(obj.Fecha || "0"),
      NumeroCliente: String(obj.NumeroCliente),
      CodigoCliente: String(obj.CodigoCliente),
      FechaVencimiento: String(obj.FechaVencimiento || "0"),
      HashDocumento: String(obj.HashDocumento || "0"),
      Owner: String(obj.Owner),
      Estatus: String(obj.Estatus)
    };

    // Crear el objeto 
    const requestData = {
      id: id,
      obj: formattedObj
    };

    console.log("Datos a encriptar:", JSON.stringify(requestData, null, 2));

    const encryptedData = await generateEncryptedData(requestData);
    console.log("Body enviado a /createone:", JSON.stringify(encryptedData, null, 2));

    const response = await axios.post(
      `${API_URL}/createone`,
      encryptedData,
      {
        headers: DEFAULT_HEADERS
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error en createPagare:", error);
    const errorMessage = error.response?.data?.response?.message || 
                        error.response?.data?.message || 
                        error.message;
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

// Servicio para obtener palabras semilla
export const fetchSeedWords = async () => {
  try {
    const response = await axios.get(`${API_URL}/words`, {
      headers: DEFAULT_HEADERS
    });
    return response.data.message.split(' ');
  } catch (error: any) {
    console.error("Error en fetchSeedWords:", error);
    const errorMessage = error.response?.data?.response?.message || 
                        error.response?.data?.message || 
                        error.message;
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

// Servicio para registrar usuario con semilla
export const registerUserWithSeed = async (
  mnemonic: string,
  password: string,
  email: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/register`, 
      { mnemonic, password },
      {
        headers: DEFAULT_HEADERS
      }
    );

    const { privateKey, publicKey } = response.data.response;
    
    if (!privateKey || !publicKey) {
      throw new Error("La respuesta del servidor no contiene las claves necesarias");
    }

    // Desactivar todas las cuentas existentes
    const existingAccounts = await getDataFromDB("registerData") || [];
    const updatedAccounts = existingAccounts.map((account: any) => ({
      ...account,
      isActive: false
    }));

    // Agregar la nueva cuenta como activa
    updatedAccounts.push({
      encrypted: privateKey,
      publicKey: publicKey,
      password: password,
      email: email,
      isActive: true
    });

    await saveDataToDB("registerData", updatedAccounts);
    console.log("Nueva cuenta registrada y activada");

    return response.data;
  } catch (error: any) {
    console.error("Error en registerUserWithSeed:", error);
    const errorMessage = error.response?.data?.response?.message || 
                        error.response?.data?.message || 
                        error.message;
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

// Servicio para recuperar cuenta con palabras semilla
export const recoverAccount = async (
  mnemonic: string,
  newpassword: string,
  email: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/recover`,
      { mnemonic, newpassword },
      {
        headers: DEFAULT_HEADERS
      }
    );

    const { privateKey, publicKey } = response.data.response;
    
    if (!privateKey || !publicKey) {
      throw new Error("La respuesta del servidor no contiene las claves necesarias");
    }

    // Desactivar todas las cuentas existentes
    const existingAccounts = await getDataFromDB("registerData") || [];
    const updatedAccounts = existingAccounts.map((account: any) => ({
      ...account,
      isActive: false
    }));

    // Agregar la cuenta recuperada como activa
    updatedAccounts.push({
      encrypted: privateKey,
      publicKey: publicKey,
      password: newpassword,
      email: email,
      isActive: true
    });

    await saveDataToDB("registerData", updatedAccounts);
    console.log("Cuenta recuperada y activada");

    return response.data;
  } catch (error: any) {
    console.error("Error en recoverAccount:", error);
    const errorMessage = error.response?.data?.response?.message || 
                        error.response?.data?.message || 
                        error.message;
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};

export const loginUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const accounts = await getDataFromDB("registerData") || [];
    
    // Buscar la cuenta con el email y password proporcionados
    const accountIndex = accounts.findIndex((account: any) => 
      account.email === email && account.password === password
    );

    if (accountIndex === -1) {
      throw new Error("Credenciales inválidas");
    }

    // Desactivar todas las cuentas y activar la seleccionada
    const updatedAccounts = accounts.map((account: any, index: number) => ({
      ...account,
      isActive: index === accountIndex
    }));

    await saveDataToDB("registerData", updatedAccounts);
    console.log("Sesión iniciada correctamente");
    
    return true;
  } catch (error: any) {
    console.error("Error en loginUser:", error);
    showErrorModal("Error", error.message);
    return false;
  }
};

export const getActiveAccount = async () => {
  try {
    const accounts = await getDataFromDB("registerData") || [];
    return accounts.find((account: any) => account.isActive) || null;
  } catch (error) {
    console.error("Error al obtener la cuenta activa:", error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    const accounts = await getDataFromDB("registerData") || [];
    const updatedAccounts = accounts.map((account: any) => ({
      ...account,
      isActive: false
    }));

    await saveDataToDB("registerData", updatedAccounts);
    console.log("Sesión cerrada correctamente");
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};




