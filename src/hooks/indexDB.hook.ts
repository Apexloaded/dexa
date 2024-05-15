import { useEffect, useState } from "react";

export enum Stores {
  Users = "users",
  Buckets = "buckets",
}

function useIndexDBHook() {
  const [isDBInit, setInit] = useState<boolean>(false);
  let request: IDBOpenDBRequest;
  let db: IDBDatabase;
  let version = 1;

  useEffect(() => {
    if (window.indexedDB) {
      initDB();
    }
  }, []);

  const initDB = () => {
    request = indexedDB.open("dexa-db");
    request.onupgradeneeded = () => {
      db = request.result;

      if (!isObject(Stores.Users)) {
        db.createObjectStore(Stores.Users, { keyPath: "address" });
      }
      if (!isObject(Stores.Buckets)) {
        db.createObjectStore(Stores.Buckets, { keyPath: "name" });
      }
    };
    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      setInit(true);
    };

    request.onerror = (event) => {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
  };

  const isObject = (object: string): boolean => {
    return db.objectStoreNames.contains(object);
  };

  const addData = <T>(
    storeName: Stores,
    data: T
  ): Promise<T | string | null> => {
    return new Promise((resolve, reject) => {
      request = indexedDB.open("dexa-db", version);

      request.onsuccess = () => {
        console.log("request.onsuccess - addData", data);
        db = request.result;
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        store.add(data);
        resolve(data);
      };

      request.onerror = () => {
        const error = request.error?.message;
        if (error) {
          reject(error);
        } else {
          reject("Unknown error");
        }
      };
    });
  };

  const getData = <T>(storeName: Stores): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      request = indexedDB.open("dexa-db", version);

      request.onsuccess = (ev) => {
        db = request.result;
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const res = store.getAll();
        res.onsuccess = () => {
          resolve(res.result);
        };
      };

      request.onerror = () => {
        const error = request.error?.message;
        console.log(error);
        if (error) {
          reject(error);
        } else {
          reject("Unknown error");
        }
      };
    });
  };

  return { addData, getData, isDBInit };
}

export default useIndexDBHook;
