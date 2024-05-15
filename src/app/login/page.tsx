"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import Image from "next/image";
import { connectorIcons, favicon } from "@/components/Icons/Connector";
import Button from "@/components/Form/Button";
import { config } from "@/config/wagmi.config";
import { getNonce } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { getWagmiError } from "@/libs/helpers";
import SignInModal from "@/components/Auth/Login/Signature";

export default function Login() {
  const [signModal, setSignModal] = useState<boolean>(false);
  const { connect, connectors, error, isPending, isSuccess, isError } =
    useConnect({
      config,
    });
  const { isConnected, address } = useAccount();
  const [_, setNonce] = useState<string>();
  const [toastId, setToastId] = useState<string>();

  useEffect(() => {
    const check = () => {
      if (isSuccess) {
        toast.success("Wallet connected", {
          id: toastId,
        });
      }
      if (isError) {
        toast.error(getWagmiError(error.message), {
          id: toastId,
        });
      }
    };
    check();
  }, [isPending, isSuccess, isError, toastId]);

  useEffect(() => {
    async function fetchNonce() {
      if (isConnected && address) {
        try {
          setSignModal(true);
          const res = await getNonce(address);
          setNonce(res.nonce);
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    }
    fetchNonce();
  }, [isConnected, address]);

  const connectToWallet = async (connector?: any) => {
    try {
      if (!isConnected) {
        const id = toast.loading("Waiting...", {
          position: "bottom-center",
        });
        setToastId(id);
        connect({ connector });
        return;
      }
      setSignModal(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="px-5 bg-primary/5 h-svh">
      {isConnected && signModal && <SignInModal setModal={setSignModal} />}
      <div className="max-w-lg mx-auto">
        <div className="flex justify-center pt-10">
          <Image
            src={favicon.main}
            width={260}
            height={260}
            alt={`dexa`}
            className="h-14 w-14"
          />
        </div>
        <div className="text-center py-4 mb-5">
          <p className="text-2xl font-semibold">Connect your wallet</p>
          <p className="text-medium">
            Seamlessly login to your account using your favourite wallet
          </p>
        </div>
        <div className="flex flex-col border border-primary/50 rounded-lg overflow-hidden">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              kind={`default`}
              onClick={() => connectToWallet(connector)}
              className="py-[1rem] capitalize border-b border-primary/50 hover:bg-primary/5 rounded-none last:border-none"
            >
              <p className="flex justify-between items-center">
                <span className="flex items-center">
                  <Image
                    src={connectorIcons[connector.id].icon}
                    alt={connectorIcons[connector.id].key}
                    height={25}
                    width={25}
                  />
                  <span className="ml-3 font-medium">{connector.name}</span>
                </span>
                {connector.id === "metaMaskSDK" && (
                  <span className="text-xs bg-primary text-white px-3 rounded-sm">
                    Popular
                  </span>
                )}
              </p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
