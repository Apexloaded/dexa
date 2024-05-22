"use client";

import { GREEN_CHAIN_ID } from "@/config/env";
import {
  VisibilityType,
  Long,
  Client,
  IReturnOffChainAuthKeyPairAndUpload,
} from "@bnb-chain/greenfield-js-sdk";
import { useEffect, useState } from "react";
import { Connector, useAccount } from "wagmi";

function useGreenFieldHook() {
  const [client, setClient] = useState<Client>(
    Client.create(
      process.env.NEXT_PUBLIC_GRPC_URL!,
      String(process.env.NEXT_PUBLIC_GREEN_CHAIN_ID)
    )
  );
  const { address, connector } = useAccount();

  useEffect(() => {
    const create = Client.create(
      process.env.NEXT_PUBLIC_GRPC_URL!,
      String(process.env.NEXT_PUBLIC_GREEN_CHAIN_ID)
    );
    setClient(create);
  }, []);

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

  const getSps = async () => {
    const sps = await client.sp.getStorageProviders();
    const finalSps = (sps ?? []).filter((v: any) =>
      v.endpoint.includes("nodereal")
    );

    return finalSps;
  };

  const getAllSps = async () => {
    const sps = await getSps();

    return sps.map((sp) => {
      return {
        address: sp.operatorAddress,
        endpoint: sp.endpoint,
        name: sp.description?.moniker,
      };
    });
  };

  const selectSp = async () => {
    const finalSps = await getSps();

    const selectIndex = Math.floor(Math.random() * finalSps.length);

    const secondarySpAddresses = [
      ...finalSps.slice(0, selectIndex),
      ...finalSps.slice(selectIndex + 1),
    ].map((item) => item.operatorAddress);
    const selectSpInfo = {
      id: finalSps[selectIndex].id,
      endpoint: finalSps[selectIndex].endpoint,
      primarySpAddress: finalSps[selectIndex]?.operatorAddress,
      sealAddress: finalSps[selectIndex].sealAddress,
      secondarySpAddresses,
    };

    return selectSpInfo;
  };

  const generateAuthKey = async (address: string, provider: any) => {
    const allSps = await getAllSps();
    const offchainAuthRes =
      await client.offchainauth.genOffChainAuthKeyPairAndUpload(
        {
          sps: allSps,
          chainId: GREEN_CHAIN_ID,
          expirationMs: 5 * 24 * 60 * 60 * 1000,
          domain: window.location.origin,
          address,
        },
        provider
      );
    const { code, body: offChainData } = offchainAuthRes;
    if (code == 0 && offChainData) {
      localStorage.setItem(address, JSON.stringify(offChainData));
    }
    return offchainAuthRes;
  };

  const getOffchainAuthKeys = async (address: string, provider: any) => {
    const storageResStr = localStorage.getItem(address);
    if (storageResStr) {
      const storageRes = JSON.parse(
        storageResStr
      ) as IReturnOffChainAuthKeyPairAndUpload;
      if (storageRes.expirationTime < Date.now()) {
        localStorage.removeItem(address);
        const res = await generateAuthKey(address, provider);
        return res.body;
      }

      return storageRes;
    }

    await generateAuthKey(address, provider);
  };

  return { createBucket, getOffChainAuth };
}

export default useGreenFieldHook;
