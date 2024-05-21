import greenFieldHook from "@/hooks/gnfd.hook";
import {
  IReturnOffChainAuthKeyPairAndUpload,
  TxResponse,
  VisibilityType,
} from "@bnb-chain/greenfield-js-sdk";
import { createContext, useContext } from "react";
import { Connector } from "wagmi";

export type GnfdContextType = {
  getOffChainAuth: (
    connector: Connector
  ) => Promise<IReturnOffChainAuthKeyPairAndUpload | undefined>;
  createBucket: (
    bucket: string,
    visibility: VisibilityType
  ) => Promise<TxResponse>;
};

interface Props {
  children: React.ReactNode;
}

export const GnfdContext = createContext<GnfdContextType | undefined>(
  undefined
);

export function GnfdProvider({ children }: Props) {
  const gnfd = greenFieldHook();

  return <GnfdContext.Provider value={gnfd}>{children}</GnfdContext.Provider>;
}

export function useGnfd() {
  const context = useContext(GnfdContext);
  if (context === undefined) {
    throw new Error("useGnfd must be used within a GnfdProvider");
  }
  return context;
}
