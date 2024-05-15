import useBucket from "@/hooks/bucket.hook";
import useGnObject from "@/hooks/object.hook";
import {
  CreateBucket,
  CreateObject,
  UploadObject,
} from "@/interfaces/bucket.interface";
import { SpResponse } from "@bnb-chain/greenfield-js-sdk";
import { createContext, useContext } from "react";

export type GreenFieldContextType = {
  createBucket: (props: CreateBucket) => Promise<any>;
  getBucketApproval: (
    props: CreateBucket
  ) => Promise<SpResponse<string> | undefined>;
  createObject: (props: CreateObject) => Promise<any>;
  uploadObject: (props: UploadObject) => Promise<any>;
};

interface Props {
  children: React.ReactNode;
}

export const GreenFieldContext = createContext<
  GreenFieldContextType | undefined
>(undefined);

export function GreenFieldProvider({ children }: Props) {
  const bucket = useBucket();
  const object = useGnObject();

  return (
    <GreenFieldContext.Provider
      value={{
        ...bucket,
        ...object,
      }}
    >
      {children}
    </GreenFieldContext.Provider>
  );
}

export function useGreenField() {
  const context = useContext(GreenFieldContext);
  if (context === undefined) {
    throw new Error("useGreenField must be used within a GreenFieldProvider");
  }
  return context;
}
