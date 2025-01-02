// src/utils/indexedDB.ts
import { openDB } from 'idb';

const DB_NAME = 'blockchainDB';
const STORE_NAME = 'userStoreTest';

// Función para inicializar la base de datos
export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Función para guardar datos
export const saveToDB = async (data: { email: string }) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add(data);
  await tx.done;
};

// Función para obtener todos los datos
export const getFromDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const data = await tx.store.getAll();
  return data;
};

// Función para limpiar la base de datos (opcional)
export const clearDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.clear();
  await tx.done;
};
