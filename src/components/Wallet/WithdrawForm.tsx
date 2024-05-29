"use client";

import React, { useState, useEffect } from "react";
import Label from "../Form/Label";
import Input from "../Form/Input";
import TabsRoot from "../Tabs/TabsRoot";
import TabsList from "../Tabs/TabsList";
import TabsHeader from "../Tabs/TabsHeader";
import TabsContent from "../Tabs/TabsContent";
import Button from "../Form/Button";
import { ClipboardPenLineIcon } from "lucide-react";
import Select, { Options } from "../Form/Select";
import { Tokens } from "@/config/tokens";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useDexa } from "@/context/dexa.context";
import { UserBalance } from "@/interfaces/user.interface";
import { walletToLowercase, weiToUnit } from "@/libs/helpers";
import { withdrawalResolver } from "@/schemas/withdraw.schema";
import ShowError from "../Form/ShowError";
import useClipBoard from "@/hooks/clipboard";
import useToast from "@/hooks/toast.hook";
import { ZeroAddress, parseEther } from "ethers";
import { useRouter } from "next/navigation";

function WithdrawForm() {
  const {
    resetField,
    trigger,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ ...withdrawalResolver });
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("tab1");
  const { paste } = useClipBoard();
  const { error, loading, success } = useToast();
  const [amount, setAmount] = useState<string>("0.00");
  const [resetKey, setResetKey] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<Options>();
  const [tokenBalance, setTokenBalance] = useState<UserBalance>();
  const { dexaCreator, CreatorABI } = useDexa();
  const { writeContractAsync, isPending } = useWriteContract();
  const [options] = useState(
    Tokens.map((t) => {
      return { value: t.address, name: t.name, icon: t.icon };
    })
  );

  const { data } = useReadContract({
    abi: CreatorABI,
    address: dexaCreator,
    functionName: "getTokenBalances",
    args: [`${address}`],
  });

  useEffect(() => {
    const init = () => {
      console.log(data);
      if (!data) return;
      const userBal = (data as UserBalance[]).map((balance: UserBalance) => {
        const token = Tokens.find(
          (t) =>
            walletToLowercase(t.address) ===
            walletToLowercase(balance.tokenAddress)
        );
        return { ...balance, ...(token || {}) };
      });
      const token = userBal.find((b) => b.address == selectedToken?.value);
      setTokenBalance(token);
    };
    init();
  }, [data, selectedToken]);

  const onTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const setMax = () => {
    if (!tokenBalance) return;
    const amount = weiToUnit(`${tokenBalance?.balance}`);
    setValue("amount", amount);
    setAmount(`${amount}`);
    trigger("amount");
  };

  const onPaste = async () => {
    const text = await paste();
    if (!text) return;
    setValue("to", text);
    trigger("to");
  };

  const onSubmit = async (payload: FieldValues) => {
    try {
      const { to, token, amount } = payload;
      loading({
        msg: "Initiating withdrawal",
      });
      await writeContractAsync(
        {
          abi: CreatorABI,
          address: dexaCreator,
          functionName: "creatorTransfer",
          args: [to, token, parseEther(`${amount}`)],
        },
        {
          onSuccess: async (data) => {
            success({
              msg: `${amount} ${tokenBalance?.name} withdrawn succesfully`,
            });
            resetForm();
          },
          onError(err) {
            error({ msg: `${err.message}` });
          },
        }
      );
    } catch (err) {
      if (err instanceof Error) {
        error({ msg: err.message });
      }
      if (err && typeof err === "object") {
        error({ msg: JSON.stringify(err) });
      }
    }
  };

  const resetForm = () => {
    setAmount("0.00");
    reset();
    setResetKey((prevKey) => prevKey + 1);
    setTokenBalance(undefined);
    setSelectedToken(undefined);
  };

  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="mt-4 md:w-[6rem] hidden md:inline">
          <p className="text-dark md:text-medium text-xs md:text-sm uppercase md:capitalize font-semibold md:font-normal">
            Select Coin
          </p>
        </div>
        <div className="flex-1">
          <Label title="Token" isMargin={true} isRequired={true} />
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                options={options}
                placeholder="Choose option"
                onSelect={(token) => {
                  setSelectedToken(token);
                  onChange(token.value);
                }}
                key={resetKey}
              />
            )}
            name={"token"}
          />
          {errors.token && <ShowError error={errors.token?.message} />}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-6">
        <div className="md:w-[6rem]">
          <p className="text-dark md:text-medium text-xs md:text-sm uppercase md:capitalize font-semibold md:font-normal">
            Withdraw To
          </p>
        </div>
        <div className="flex-1">
          <TabsRoot>
            <TabsList className="border-b border-light">
              <TabsHeader
                isActiveBg={true}
                isActiveText={true}
                title="Wallet Address"
                value="tab1"
                activeTabId={activeTab}
                onTabChange={onTabChange}
              />
              <TabsHeader
                isActiveBg={true}
                isActiveText={true}
                title="Dexa User"
                value="tab2"
                activeTabId={activeTab}
                onTabChange={onTabChange}
              />
            </TabsList>
            <TabsContent value="tab1" activeTabId={activeTab}>
              <div className="flex flex-col gap-5">
                <div className="flex-1 mt-6">
                  <Label
                    title="Wallet Address"
                    isMargin={true}
                    isRequired={true}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="flex items-center relative bg-light">
                        <Input
                          type={"search"}
                          isOutline={false}
                          className="bg-light text-sm"
                          placeholder="0x719c1A5dac69C4C6b462Aa7E8Fb9bc90Ec9128b9"
                          onChange={onChange}
                          value={value ? value : ""}
                        />
                        <div role="button" onClick={onPaste} className="p-4">
                          <ClipboardPenLineIcon
                            className="text-primary"
                            size={20}
                          />
                        </div>
                      </div>
                    )}
                    name={"to"}
                  />
                  {errors.to && <ShowError error={errors.to?.message} />}
                </div>
                <div className="flex-1">
                  <Label title="Amount" isMargin={true} isRequired={true} />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="flex items-center relative bg-light">
                        <Input
                          isOutline={false}
                          className="bg-light text-sm"
                          placeholder="Min amount: 0.01"
                          onChange={(e) => {
                            onChange(e);
                            setAmount(e.target.value);
                          }}
                          value={value ? value : ""}
                        />
                        {Number(tokenBalance?.balance) > 0 && (
                          <div
                            role="button"
                            onClick={setMax}
                            className="flex gap-1 p-4"
                          >
                            <p className="text-primary text-sm font-semibold">
                              Max
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    name={"amount"}
                  />
                  {errors.amount && (
                    <ShowError error={errors.amount?.message} />
                  )}
                  <div className="flex gap-3 items-center text-primary">
                    <p className="text-sm font-semibold">Available Balance:</p>
                    <p className="text-sm font-semibold">
                      {tokenBalance
                        ? `${weiToUnit(tokenBalance.balance)}`
                        : "0.00"}{" "}
                      {selectedToken?.name}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <Label title="Remark" isMargin={true} />
                  <Input className="bg-light text-sm" placeholder="Remarks" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab2" activeTabId={activeTab}>
              <div>Tab 2</div>
            </TabsContent>
          </TabsRoot>
          <div className="flex justify-between mt-10 items-center">
            <div className="flex flex-col">
              <p className="text-sm">Amount Recieved</p>
              <div className="flex gap-1 items-center">
                <p className="text-xl">{amount}</p>
                <p className="text-xl">{selectedToken?.name}</p>
              </div>
              <p className="text-xs text-medium">
                Fee: 1.00 {selectedToken?.name}
              </p>
            </div>
            <div>
              <Button
                type={"submit"}
                kind={"primary"}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || isPending}
              >
                <div className="px-10 h-8 flex items-center justify-center">
                  <p>Withdraw</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawForm;
