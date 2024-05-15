"use client";

import useIndexDBHook, { Stores } from "@/hooks/indexDB.hook";
import { createContext, useContext, useState } from "react";

export type IndexDBContextType = {
  addData: <T>(storeName: Stores, data: T) => Promise<T | string | null>;
  getData: <T>(storeName: Stores) => Promise<T[]>;
  isDBInit: boolean;
};

interface Props {
  children: React.ReactNode;
}

export const IndexDBContext = createContext<IndexDBContextType | undefined>(
  undefined
);

export function IndexDBProvider({ children }: Props) {
  const db = useIndexDBHook();
  return (
    <IndexDBContext.Provider value={{ ...db }}>
      {children}
    </IndexDBContext.Provider>
  );
}

export function useIndexDB() {
  const context = useContext(IndexDBContext);
  if (context === undefined) {
    throw new Error("useIndexDB must be used within a IndexDBProvider");
  }
  return context;
}
