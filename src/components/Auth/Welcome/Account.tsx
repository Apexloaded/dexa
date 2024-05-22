import React from "react";
import Label from "@/components/Form/Label";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { profileResolver } from "@/schemas/welcome.schema";
import ShowError from "@/components/Form/ShowError";
import { useWriteContract } from "wagmi";
import { useDexa } from "@/context/dexa.context";
import { config } from "@/config/wagmi.config";
import { HOSTNAME } from "@/config/env";
import { FieldValues, useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ContractError } from "@/libs/enum";
import { useAuth } from "@/context/auth.context";
type Props = {
  nextStep: (value: number) => void;
  index: number;
};

const getError = (error: Error): string => {
  const errorMessages: { [key: string]: string } = {
    [ContractError.ERROR_DUPLICATE_RESOURCE]: "User already registered",
    [ContractError.ERROR_INVALID_STRING]: "Invalid display name or username",
  };

  const foundMessage = Object.entries(errorMessages).find(([key]) =>
    error.message.includes(key)
  );

  return foundMessage ? foundMessage[1] : "An error occurred";
};

export default function AccountStep({ nextStep, index }: Props) {
  const router = useRouter();
  const { writeContractAsync } = useWriteContract({ config });
  const { setProfileProgress } = useAuth();
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
      const { name, username } = data;
      await writeContractAsync(
        {
          abi: CreatorABI,
          address: dexaCreator,
          functionName: "registerCreator",
          args: [name, username, `${HOSTNAME}/${username}`],
        },
        {
          onSuccess: async (data) => {
            toast.success("Profile created", {
              id: loadToast,
            });
            setProfileProgress(100);
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
