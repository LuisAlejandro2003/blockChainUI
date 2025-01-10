const DB_NAME = 'secureDB';
const STORE_NAME = 'encryptedStore';

// Inicializa la base de datos
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
        console.log(`Object Store '${STORE_NAME}' creado.`);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject((e.target as IDBRequest).error);
  });
};

// Guardar datos en IndexedDB
export const saveDataToDB = async (key: string, value: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put(value, key);
  console.log(`Datos guardados con la clave '${key}'.`);
};

// Recuperar datos de IndexedDB
export const getDataFromDB = async (key: string): Promise<any> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
