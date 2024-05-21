"use client";

import Button from "@/components/Form/Button";
import { bucketResolver } from "@/schemas/welcome.schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import dbAnim from "@/assets/lottie/db.json";
import { formatWalletAddress } from "@/libs/helpers";
import { useDexa } from "@/context/dexa.context";
import { ZeroAddress, ethers } from "ethers";
import { useGnfd } from "@/context/gnfd.context";
import { VisibilityType } from "@bnb-chain/greenfield-js-sdk";

function TestDev() {
  const [bucket, setBucket] = useState<string>();
  const { address, connector } = useAccount();
  const { createBucket, getOffChainAuth } = useGnfd();
  const { writeContractAsync, isPending } = useWriteContract();
  const {
    ERC20ABI,
    dexaCreator,
    CreatorABI,
    FeedsABI,
    dexaFeeds,
    feedsToken,
    FeedsTokenABI,
  } = useDexa();
  const { data } = useReadContract({
    abi: CreatorABI,
    address: dexaCreator,
    functionName: "getBalance",
    args: ["0x691889F5944126906F0051c5ca087e975BADABb3", ZeroAddress],
  });

  console.log(data);

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ ...bucketResolver });

  useEffect(() => {
    const generateBucket = () => {
      const name = formatWalletAddress(`${address}`, "-", 5, 5);
      const defaultBucket = `dexa-${name}`.toLowerCase();
      setValue("bucket", defaultBucket);
      setBucket(defaultBucket);
    };
    if (address) generateBucket();
  }, [address]);

  const grantRole = async () => {
    let loadToast: string;
    try {
      if (!bucket || !address) return;
      loadToast = toast.loading("Waiting...", {
        position: "bottom-center",
      });

      const res = await createBucket(
        bucket,
        VisibilityType.VISIBILITY_TYPE_PUBLIC_READ
      );

      console.log(res);
      // const tx = await writeContractAsync(
      //   {
      //     abi: FeedsTokenABI,
      //     address: feedsToken,
      //     functionName: "setTokenURI",
      //     args: [
      //       "https://gnfd-testnet-sp1.bnbchain.org/view/dexa/metadata/{id}.json",
      //     ],
      //   },
      //   {
      //     onSuccess(data) {
      //       toast.success("Role Granted", {
      //         id: loadToast,
      //       });
      //       console.log(data);
      //     },
      //     onError(err) {
      //       toast.error(err.message, {
      //         id: loadToast,
      //       });
      //     },
      //   }
      // );
      // console.log(tx);
    } catch (err) {
      console.log(typeof err);
      console.log(err);
    }
  };

  const transfer = async () => {
    let loadToast: string;
    try {
      if (!bucket || !address) return;
      loadToast = toast.loading("Waiting...", {
        position: "bottom-center",
      });

      //0xa7a925e56b0f4627a3e4910a6e10d23a82143f84f9d73d587c9ef425941ace8e;
      const tx = await writeContractAsync(
        {
          abi: FeedsABI,
          address: dexaFeeds,
          functionName: "transfer",
          args: [
            "0xa11FC023Ed3a655DE0e56BE9e68fd6c18dC5F70E",
            "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06",
            ethers.parseEther("1"),
          ],
        },
        {
          onSuccess(data) {
            toast.success("Storage created", {
              id: loadToast,
            });
            console.log(data);
          },
          onError(err) {
            toast.error(err.message, {
              id: loadToast,
            });
          },
        }
      );
      console.log(tx);
    } catch (err) {
      console.log(typeof err);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto">
      <div className="">
        <Lottie animationData={dbAnim} className="-mt-10" />
        <div className="flex items-center gap-1 justify-center">
          <p className="text-primary font-semibold">Storage Bucket:</p>
          <p>{bucket}</p>
        </div>
      </div>

      <Button
        type={"button"}
        onClick={grantRole}
        shape={"ROUNDED"}
        kind={"primary"}
        className="h-12"
        disabled={isPending}
      >
        Grant Permission
      </Button>

      <Button
        type={"button"}
        onClick={transfer}
        shape={"ROUNDED"}
        kind={"primary"}
        className="h-12"
        disabled={isPending}
      >
        Transfer
      </Button>
    </div>
  );
}

export default TestDev;
