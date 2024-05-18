"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "../Form/Button";
import {
  ArrowLeftRightIcon,
  EyeIcon,
  EyeOffIcon,
  SquareMinusIcon,
  WalletMinimalIcon,
} from "lucide-react";
import { BNB } from "../Icons/NetworkIcons";
import BlueCheckMark from "./BlueCheck";
import { useAuth } from "@/context/auth.context";
import { UserBalance, UserInterface } from "@/interfaces/user.interface";
import { useAccount, useReadContract } from "wagmi";
import { useDexa } from "@/context/dexa.context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ethers } from "ethers";
import { Tokens } from "@/config/tokens";
import { walletToLowercase, weiToUnit } from "@/libs/helpers";
import Link from "next/link";
import QuickViewBal from "./QuickViewBal";

function QuickView() {
  const swiperElRef = useRef(null);
  const [hideBal, setHideBal] = useState<boolean>(false);
  const [balances, setBalances] = useState<UserBalance[]>([]);
  const { address } = useAccount();
  const { user } = useAuth();
  const { dexaCreator, CreatorABI } = useDexa();
  const { data } = useReadContract({
    abi: CreatorABI,
    address: dexaCreator,
    functionName: "getTokenBalances",
    args: [`${address}`],
  });

  useEffect(() => {
    const init = () => {
      if (!data) return;
      const userBal = (data as UserBalance[]).map((balance: UserBalance) => {
        const token = Tokens.find(
          (t) =>
            walletToLowercase(t.address) ===
            walletToLowercase(balance.tokenAddress)
        );
        return { ...balance, ...(token || {}) };
      });
      console.log(userBal);
      setBalances(userBal);
    };
    init();
  }, [data, address]);

  return (
    <div className="">
      <div className="flex justify-between sticky top-0 bg-white">
        <p className="text-xl font-semibold">Profile</p>
        <div className="flex gap-4 items-center justify-end text-right">
          <div className="name">
            <Link
              href={`/${user?.username}`}
              className="font-bold flex items-center gap-1 capitalize"
            >
              <BlueCheckMark />
              <span>{user?.name}</span>{" "}
            </Link>
            <p className="text-neutral-400 text-sm">Professional</p>
          </div>
          <div className="w-10 h-10 overflow-hidden rounded-full border border-light">
            {/* <Image src={Avatar} alt={`avatar`} /> */}
          </div>
        </div>
      </div>
      <div>
        <div className="bg-quick-view bg-contain p-5 mt-2 rounded-2xl">
          <div className="mb-5 text-light">
            <p className="font-light flex justify-between items-center">
              <span className="">Account balance</span>
              <span
                className="cursor-pointer p-2 text-xl"
                onClick={() => setHideBal(!hideBal)}
              >
                {hideBal ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </p>
            {hideBal ? (
              <div className="mb-2">
                <p>
                  <span className="text-5xl font-semibold">*****</span>
                </p>
                <p className="font-light -mt-4 text-2xl">******</p>
              </div>
            ) : (
              <>
                {balances.length > 1 ? (
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 5000 }}
                    slidesPerView={1}
                    direction={"vertical"}
                    className="h-16"
                    loop={true}
                    speed={2000}
                  >
                    {balances.map((bal, index) => (
                      <SwiperSlide key={index}>
                        <QuickViewBal
                          balance={bal.balance}
                          icon={bal.icon ? <bal.icon /> : <></>}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <>
                    {balances.length < 1 ? (
                      <QuickViewBal balance="0.00" icon={<BNB />} />
                    ) : (
                      <>
                        {balances.map((bal, index) => (
                          <QuickViewBal
                            key={index}
                            balance={bal.balance}
                            icon={bal.icon ? <bal.icon /> : <></>}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex xl:flex-row flex-col gap-2 justify-center">
            <Button
              kind="default"
              shape={"ROUNDED"}
              className="text-sm border border-white"
            >
              Add Fund
            </Button>
            <Link href="/withdraw">
              <Button
                shape={"ROUNDED"}
                kind="primary"
                className="text-sm border bg-transparent border-white"
              >
                Withdraw
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-center mt-4 flex shrink-0 cursor-pointer transition-all duration-500">
          <div className="flex flex-1 text-primary group flex-col items-center">
            <div className="h-12 w-12 mb-1 rounded-full group-hover:bg-primary/15 transition-all duration-150 bg-primary/20 flex items-center justify-center">
              <WalletMinimalIcon size={22} />
            </div>
            <p className="text-xs">Deposit</p>
          </div>
          <div className="flex flex-1 text-primary group flex-col items-center">
            <div className="h-12 w-12 mb-1 rounded-full group-hover:bg-primary/15 transition-all duration-150 bg-primary/20 flex items-center justify-center">
              <SquareMinusIcon size={22} />
            </div>
            <p className="text-xs">Withdraw</p>
          </div>
          <div className="flex flex-1 text-primary group flex-col items-center">
            <div className="h-12 w-12 mb-1 rounded-full group-hover:bg-primary/15 transition-all duration-150 bg-primary/20 flex items-center justify-center">
              <ArrowLeftRightIcon size={22} />
            </div>
            <p className="text-xs">Transfer</p>
          </div>
        </div>
      </div>
      {/* <AddFundModal isOpen={fundShelveModal} setIsOpen={setFundShelveModal} /> */}
    </div>
  );
}

export default QuickView;
