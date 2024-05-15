"use client";

import Section from "@/components/Layouts/Section";
import Bucket from "@/components/Auth/Welcome/Bucket";
import { Suspense } from "react";
import Button from "@/components/Form/Button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useDexa } from "@/context/dexa.context";

export default function Settings() {
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const { dexaABI, dexaAddress } = useDexa();

  const onCreate = async () => {
    const tx = await writeContractAsync({
      abi: dexaABI,
      address: dexaAddress,
      functionName: "registerCreator",
      args: [
        "Elon Musk",
        "elonmusk",
        "https://dexa.ink/elonmusk",
        "https://dexa.ink/bio",
      ],
    });
    console.log(tx);
  };

  return (
    <div className="flex space-x-5">
      <Section>
        <Suspense>
          <Bucket />
          <Button
            onClick={onCreate}
            disabled={isPending}
            kind={"primary"}
            type={"button"}
          >
            {isPending ? "Confirming..." : "Create Account"}
          </Button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
        </Suspense>
      </Section>
    </div>
  );
}
