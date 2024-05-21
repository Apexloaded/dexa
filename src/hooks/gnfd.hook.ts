import { client, selectSp } from "@/client";
import { getOffchainAuthKeys } from "@/libs/offchainAuth";
import { VisibilityType, Long } from "@bnb-chain/greenfield-js-sdk";
import { useEffect } from "react";
import { Connector, useAccount } from "wagmi";

function greenFieldHook() {
  const { address, connector } = useAccount();

  useEffect(() => {
    const init = async () => {
      if (!connector) return;
      await getOffChainAuth(connector);
    };
    if (connector && address) init();
  }, [connector, address]);

  const createBucket = async (bucket: string, visibility: VisibilityType) => {
    const spInfo = await selectSp();
    const tx = await client.bucket.createBucket({
      bucketName: bucket,
      creator: `${address}`,
      visibility: visibility,
      chargedReadQuota: Long.fromString("0"),
      primarySpAddress: spInfo.primarySpAddress,
      paymentAddress: `${address}`,
    });
    return tx;
  };

  const getOffChainAuth = async (connector: Connector) => {
    try {
      const provider = await connector.getProvider();
      const offChainData = await getOffchainAuthKeys(`${address}`, provider);
      return offChainData;
    } catch (error) {}
  };

  return { createBucket, getOffChainAuth };
}

export default greenFieldHook;
