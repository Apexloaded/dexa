import { client, selectSp } from "@/client";
import { CreateObject, UploadObject } from "@/interfaces/bucket.interface";
import { getOffchainAuthKeys } from "@/libs/offchainAuth";
import { useAccount } from "wagmi";

function useGnObject() {
  const { address, connector } = useAccount();

  const getOffchainData = async (address: any) => {
    const spInfo = await selectSp();
    const provider = await connector?.getProvider();
    const offChainData = await getOffchainAuthKeys(address, provider);
    return { spInfo, provider, offChainData };
  };

  const createObject = async ({
    bucketName,
    fileName,
    visibility,
    contentType,
    redundancyType,
    contentLength,
    expectCheckSums,
  }: CreateObject) => {
    if (!address) return;
    const { offChainData } = await getOffchainData(address);
    if (!offChainData) return;

    const createObjectTx = await client.object.createObject(
      {
        bucketName: bucketName,
        objectName: fileName,
        creator: address,
        visibility: visibility,
        fileType: contentType,
        redundancyType: redundancyType,
        contentLength: contentLength,
        expectCheckSums: expectCheckSums,
      },
      {
        type: "EDDSA",
        domain: window.location.origin,
        seed: offChainData.seedString,
        address,
      }
    );

    const simulateInfo = await createObjectTx.simulate({
      denom: "BNB",
    });

    const res = await createObjectTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || "5000000000",
      payer: address,
      granter: "",
    });

    return res;
  };

  const uploadObject = async ({
    bucketName,
    fileName,
    file,
    txHash,
  }: UploadObject) => {
    if (!address) return;
    const { offChainData } = await getOffchainData(address);
    if (!offChainData) return;
    const uploadRes = await client.object.uploadObject(
      {
        bucketName: bucketName,
        objectName: fileName,
        body: file,
        txnHash: txHash,
      },
      {
        type: "EDDSA",
        domain: window.location.origin,
        seed: offChainData.seedString,
        address,
      }
    );
    return uploadRes;
  };

  return { createObject, uploadObject };
}

export default useGnObject;
