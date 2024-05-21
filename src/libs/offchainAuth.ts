import { client, getAllSps } from "@/client";
import { GREEN_CHAIN_ID } from "@/config/env";
import { IReturnOffChainAuthKeyPairAndUpload } from "@bnb-chain/greenfield-js-sdk";

export const generateAuthKey = async (address: string, provider: any) => {
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

export const getOffchainAuthKeys = async (address: string, provider: any) => {
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
