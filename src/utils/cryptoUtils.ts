// src/utils/cryptoUtils.ts
const SALT = new TextEncoder().encode('mi_salt_unica'); // Salt para PBKDF2
const ITERATIONS = 100000; // Iteraciones para PBKDF2

// Derivar una clave a partir de una clave maestra usando PBKDF2
export async function deriveKeyFromMasterKey(): Promise<CryptoKey> {
  const masterKey = import.meta.env.VITE_REACT_APP_MASTER_KEY;
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(masterKey),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: SALT,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false, // No exportable
    ["encrypt", "decrypt"]
  );
}

// Encriptar datos
export async function encryptData(
  key: CryptoKey,
  data: any
): Promise<{ encryptedData: ArrayBuffer; iv: Uint8Array }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encodedData = new TextEncoder().encode(JSON.stringify(data));

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodedData
  );

  return { encryptedData, iv };
}

// Desencriptar datos
export async function decryptData(
  key: CryptoKey,
  encryptedData: ArrayBuffer,
  iv: Uint8Array
): Promise<any> {
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedData
  );

  return JSON.parse(new TextDecoder().decode(decryptedData));
}
