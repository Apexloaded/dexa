import React, { useEffect, useState } from "react";
import Label from "@/components/Form/Label";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { profileResolver } from "@/schemas/welcome.schema";
import ShowError from "@/components/Form/ShowError";
import { useAccount, useWriteContract } from "wagmi";
import { useDexa } from "@/context/dexa.context";
import { config } from "@/config/wagmi.config";
import { GREEN_SP, HOSTNAME } from "@/config/env";
import { FieldValues, useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { StoreBucket } from "@/interfaces/bucket.interface";
import { useRouter } from "next/navigation";
import { onboardComplete } from "@/services/auth.service";
type Props = {
  nextStep: (value: number) => void;
  index: number;
};

const getError = (error: Error) => {
  if (error.message.includes("Dexa: 2")) {
    return "User already registered";
  }
  if (error.message.includes("Dexa: 0")) {
    return "Invalid display name or username";
  }
  return "An error occurred";
};

export default function AccountStep({ nextStep, index }: Props) {
  const router = useRouter();
  const { writeContractAsync } = useWriteContract({ config });
  const [defaultBucket, setDefaultBucket] = useState<StoreBucket>();
  const { address } = useAccount();
  const { dexaCreator, CreatorABI } = useDexa();
  let loadToast: string;

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ ...profileResolver });

  const proceed = async (data: FieldValues) => {
    try {
      loadToast = toast.loading("Processing...", {
        position: "bottom-center",
      });
      const spInfo = GREEN_SP;
      const bioURI = `${spInfo}/view/dexa/creators/${address}/profile`;
      const { name, username } = data;
      const tx = await writeContractAsync(
        {
          abi: CreatorABI,
          address: dexaCreator,
          functionName: "registerCreator",
          args: [name, username, `${HOSTNAME}/${username}`],
        },
        {
          onSuccess: async (data) => {
            await onboardComplete({
              isOnboarded: true,
              bioURI,
              name,
              username,
              profile: `${HOSTNAME}/${username}`,
            });
            toast.success("Profile created", {
              id: loadToast,
            });
            router.replace("/home");
          },
          onError(error) {
            const msg = getError(error);
            toast.error(`${msg}`, {
              id: loadToast,
            });
          },
        }
      );
    } catch (error: any) {
      const msg = getError(error);
      toast.error(`${msg}`, {
        id: loadToast,
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <div>
            <Label title="Display Name" isRequired={true} isMargin={true} />
            <Input
              name="name"
              className="bg-light shadow-sm rounded-lg border border-medium"
              placeholder="John Doe"
              onChange={onChange}
              autoFocus
            />
            {errors.name && <ShowError error={errors.name.message} />}
          </div>
        )}
        name={"name"}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <Label title="Username" isRequired={true} isMargin={true} />
            <Input
              name="username"
              className="bg-light shadow-sm rounded-lg border border-medium"
              placeholder="@james"
              onChange={onChange}
              autoFocus
            />
            {errors.username && <ShowError error={errors.username.message} />}
          </div>
        )}
        name={"username"}
      />

      <div className="flex flex-col gap-5 my-5">
        <Button
          onClick={handleSubmit(proceed)}
          shape={"ROUNDED"}
          type="submit"
          className="h-12"
          kind="primary"
          disabled={isSubmitting}
        >
          Let&apos;s Proceed
        </Button>
      </div>
    </div>
  );
}
