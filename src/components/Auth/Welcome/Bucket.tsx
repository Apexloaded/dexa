"use client";

import { selectSp, client } from "@/client";
import Button from "@/components/Form/Button";
import { useGreenField } from "@/context/greenfield.context";
import { bucketResolver } from "@/schemas/welcome.schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useWriteContract } from "wagmi";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import dbAnim from "@/assets/lottie/db.json";
import { formatWalletAddress } from "@/libs/helpers";
import { useDexa } from "@/context/dexa.context";
import { BucketVisibilityType } from "@/libs/enum";
import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { generateToken, lowerTokenAlphaNumeric } from "@/libs/generateId";
import { useIndexDB } from "@/context/indexDB.context";
import { VisibilityType } from "@bnb-chain/greenfield-js-sdk";
import { createBucket } from "@/actions/bucket.action";
import { Stores } from "@/hooks/indexDB.hook";
import { StoreBucket } from "@/interfaces/bucket.interface";

type Props = {
  nextStep: (value: number) => void;
  index: number;
};

function Bucket({ nextStep, index }: Props) {
  const [bucket, setBucket] = useState<string>();
  const { addData } = useIndexDB();
  const { address } = useAccount();
  let loadToast: string;

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ ...bucketResolver });

  useEffect(() => {
    const generateBucket = () => {
      const name = formatWalletAddress(`${address}`, "-", 5, 5);
      const token = generateToken(lowerTokenAlphaNumeric, 5, true);
      const defaultBucket = `dexa-${name}-${token}`.toLowerCase();
      setValue("bucket", defaultBucket);
      setBucket(defaultBucket);
    };
    if (address) generateBucket();
  }, [address]);

  const initCreate = async () => {
    try {
      if (!bucket || !address) return;
      loadToast = toast.loading("Waiting...", {
        position: "bottom-center",
      });
      const response = await createBucket({
        name: bucket,
        visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        creator: address,
        paymentAddress: address,
      });
      if (response.code == 200 && response.data.code == 0) {
        await addData<StoreBucket>(Stores.Buckets, {
          name: bucket,
          address,
          isDefault: true,
        });
        toast.success("Storage created", {
          id: loadToast,
        });
        nextStep(index + 1);
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        toast.error(err.message, {
          id: loadToast,
        });
      }
      if (err && typeof err === "object") {
        toast.error(JSON.stringify(err), {
          id: loadToast,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Lottie animationData={dbAnim} className="-mt-10" />
        <div className="flex items-center gap-1 justify-center">
          <p className="text-primary font-semibold">Storage Bucket:</p>
          <p>{bucket}</p>
        </div>
      </div>

      <Button
        type={"button"}
        onClick={handleSubmit(initCreate)}
        shape={"ROUNDED"}
        kind={"primary"}
        className="h-12"
        disabled={isSubmitting}
      >
        Create Bucket
      </Button>
    </div>
  );
}

export default Bucket;
