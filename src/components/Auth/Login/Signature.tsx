"use client";

import Button from "@/components/Form/Button";
import { formatWalletAddress } from "@/libs/helpers";
import {
  BadgeCheckIcon,
  ShieldEllipsisIcon,
  Wallet2Icon,
  XIcon,
} from "lucide-react";
import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useStorage from "@/hooks/storage.hook";
import { StorageTypes } from "@/libs/enum";
import { useAppDispatch } from "@/hooks/redux.hook";
import { setAuth } from "@/slices/account/auth.slice";
import { getNonce, verifyNonce } from "@/services/auth.service";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function SignInModal({ setModal }: Props) {
  const router = useRouter();
  const { chainId, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { setItem } = useStorage();
  const dispatch = useAppDispatch();

  const signMessage = async () => {
    let loadToast;
    try {
      if (!address) return;
      const res = await getNonce(address);
      if (!address || !chainId) return;
      loadToast = toast.loading("Waiting...", {
        position: "bottom-center",
      });
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement:
          "For your security and convenience, please sign this signature with your wallet address.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: res.nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      const verifyRes = await verifyNonce(JSON.stringify(message), signature);
      if (verifyRes.ok) {
        const { createdAt, name, username, bioURI } = verifyRes.user;
        setItem(StorageTypes.AUTH_USER, {
          name,
          username,
          wallet: address,
          createdAt,
          bioURI,
        });
        setModal(false);
        dispatch(setAuth(true));
        toast.success("Successfully signed in!", {
          id: loadToast,
        });
        router.push("/home");
      }
      if (!verifyRes?.ok) {
        toast.error(`${verifyRes?.errors}`, {
          id: loadToast,
        });
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.code === 4001 ? "Failed to sign in!" : e.response.data, {
        id: loadToast,
      });
    }
  };

  return (
    <div className="absolute inset-0 bg-dark/20">
      <div className="h-full flex items-center max-w-md mx-auto p-5">
        <div className="bg-light rounded-3xl p-5 transition-transform duration-500">
          <div className="pb-6 flex items-center justify-between">
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary bg-primary/20"
            >
              <Wallet2Icon height={18} />
            </Button>
            <p>{formatWalletAddress(`${address}`)}</p>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-dark hover:text-primary hover:bg-primary/20"
              onClick={() => setModal(false)}
            >
              <XIcon height={18} />
            </Button>
          </div>
          <div className="body">
            <div className="flex items-center flex-col">
              <div className="bg-primary rounded-full h-12 flex items-center justify-center w-12">
                <ShieldEllipsisIcon size={30} className="text-light" />
              </div>
              <p className="font-semibold text-lg mt-1">Signature request</p>
            </div>
            <div className="px-6">
              <div className="mt-5 border border-medium/40 rounded-xl p-3">
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-primary font-semibold">Dexa</p>
                      <BadgeCheckIcon
                        size={18}
                        className="text-primary fill-primary stroke-light"
                      />
                    </div>
                    <p className="text-medium text-sm">https://dexa.ink</p>
                  </div>
                  <div className="border-t border-medium/40"></div>
                  <p className="">
                    For your security and convenience, please sign this
                    signature with your wallet address.
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-6 justify-between gap-4 mt-10">
                <Button
                  kind="default"
                  className="flex-1 h-12"
                  shape={"ROUNDED"}
                  onClick={() => setModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  kind="primary"
                  className="flex-1 h-12"
                  shape={"ROUNDED"}
                  onClick={() => signMessage()}
                >
                  Sign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
