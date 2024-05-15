import { client, selectSp } from "@/client";
import { CreateBucket } from "@/interfaces/bucket.interface";
import { getOffchainAuthKeys } from "@/libs/offchainAuth";
import { VisibilityType } from "@bnb-chain/greenfield-js-sdk";
import Long from "long";
import { useEffect } from "react";
import { useAccount } from "wagmi";

function useBucket() {
  const { address, connector } = useAccount();

  useEffect(() => {
    if (address) listBuckets(address);
  }, [address]);

  const getOffchainData = async (address: any) => {
    const spInfo = await selectSp();
    console.log(spInfo);
    console.log(connector);
    const provider = await connector?.getProvider();
    console.log(provider);
    const offChainData = await getOffchainAuthKeys(address, provider);
    return { spInfo, provider, offChainData };
  };

  const createBucket = async ({ name, visibility }: CreateBucket) => {
    if (!address) return;
    const { spInfo } = await getOffchainData(address);

    const createBucketTx = await client.bucket.createBucket({
      bucketName: name,
      creator: address,
      visibility: visibility,
      chargedReadQuota: Long.fromString("0"),
      primarySpAddress: spInfo.primarySpAddress,
      paymentAddress: address,
    });

    const simulateInfo = await createBucketTx.simulate({
      denom: "BNB",
    });

    const res = await createBucketTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || "5000000000",
      payer: address,
      granter: "",
    });

    return res;
  };

  const listBuckets = async (wallet: string) => {
    const spInfo = await selectSp();
    const res = await client.bucket.listBuckets({
      address: "0x3F0Ff5505b6425715Cb9b68649942E103DC28D0f",
      endpoint: spInfo.endpoint,
    });
    console.log(res);
    return res;
  };

  const getBucketApproval = async ({ name, visibility }: CreateBucket) => {
    if (!address) return;
    const { spInfo, offChainData } = await getOffchainData(address);
    if (!offChainData) return;

    const signature = await client.bucket.getCreateBucketApproval(
      {
        bucketName: name,
        creator: address,
        visibility: visibility,
        chargedReadQuota: "0",
        spInfo: {
          primarySpAddress: spInfo.primarySpAddress,
        },
        paymentAddress: address,
      },
      {
        type: "EDDSA",
        domain: window.location.origin,
        seed: offChainData.seedString,
        address,
      }
    );

    return signature;
  };

  return { createBucket, getBucketApproval };
}

export default useBucket;
