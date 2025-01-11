import axios from "axios";
import { showErrorModal } from "../atoms/ErrorModal";
import { getDataFromDB, saveDataToDB } from "./indexedDBService";
import CryptoJS from "crypto-js";
import { ec as EC } from "elliptic";
import { createHash, createCipheriv } from "crypto-browserify";
import { Buffer } from 'buffer/';

// Configuración
const API_URL = "http://localhost:5005";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const SERVER_KEY_PUBLIC = '046512a948f37d9bba485e0cf0c1d697d9a93dd3dcae3213a23e31cc92041412388d478a4ba3c3442993be8c7228fbd7826bc3fae1539f8f28a09290db100f6314';
const HARDCODED_PRIVATE_KEY = 'U2FsdGVkX1/g/O2dvk2V532T5ZWvXFTL7gWmdQcbS44uFrNL31LzNjL7BSNhmYuiAY5Yc1tkhfJT4xPhV2mJ6KKnu/7yJVTia3sc2cTtagebd5YFl8T9QaEz3yhp2dRt';
const HARDCODED_PASSWORD = '1234567';

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

export const generateEncryptedData = (messageObject: any) => {
  try {
    console.log("Valores iniciales en generateEncryptedData:");
    console.log("HARDCODED_PRIVATE_KEY:", HARDCODED_PRIVATE_KEY);
    console.log("HARDCODED_PASSWORD:", HARDCODED_PASSWORD);
    console.log("SERVER_KEY_PUBLIC:", SERVER_KEY_PUBLIC);
    console.log("Mensaje a encriptar:", messageObject);

    const passwordHash = createHash("sha256").update(HARDCODED_PASSWORD).digest("hex");
    const privateKeyC = CryptoJS.AES.decrypt(HARDCODED_PRIVATE_KEY, passwordHash).toString(CryptoJS.enc.Utf8);

    if (!privateKeyC) {
      throw new Error("Error al desencriptar HARDCODED_PRIVATE_KEY: Resultado vacío o nulo.");
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
    const encryptedData = generateEncryptedData({});

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
    const encryptedData = generateEncryptedData({ id });
    console.log("Datos encriptados generados:", encryptedData);

    const response = await axios.post(
      `${API_URL}/gethistoryone`,
      encryptedData,
      {
        headers: DEFAULT_HEADERS
      }
    );

    console.log("Respuesta de gethistoryone:", response.data);

    // Asumiendo que response.data es un array con un solo elemento
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
    const encryptedData = generateEncryptedData({ id, new: newOwner });
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

    // Crear el objeto con la estructura exacta requerida
    const requestData = {
      id: id,
      obj: formattedObj
    };

    console.log("Datos a encriptar:", JSON.stringify(requestData, null, 2));

    const encryptedData = generateEncryptedData(requestData);
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
  password: string
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

    await saveDataToDB("registerData", { 
      encrypted: privateKey,
      publicKey: publicKey,
      password: password
    });

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

export const postTest1 = async (
  encrypted: string,
  password: string,
  user: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/test1`, 
      { encrypted, password, user },
      {
        headers: DEFAULT_HEADERS
      }
    );

    // Almacenar respuesta de /test1 en IndexedDB
    const { ciphers, signature, hash } = response.data.response;
    await saveDataToDB("test1Data", { ciphers, signature, hash, user });

    return response.data;
  } catch (error: any) {
    console.error("Error en postTest1:", error);
    const errorMessage = error.response?.data?.message || "Error al procesar el endpoint test1.";
    showErrorModal("Error", errorMessage);
    throw new Error(errorMessage);
  }
};


