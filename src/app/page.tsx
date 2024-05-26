"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import dbAnim from "@/assets/lottie/db.json";
import { Dancing_Script } from "next/font/google";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { favicon } from "@/components/Icons/Connector";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Zoom } from "swiper/modules";
import ape1 from "@/assets/nft/1.png";
import ape2 from "@/assets/nft/2.png";
import ape3 from "@/assets/nft/3.png";
import ape4 from "@/assets/nft/4.png";
import ape5 from "@/assets/nft/5.png";
import ape6 from "@/assets/nft/6.png";
import ape7 from "@/assets/nft/7.png";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Button from "@/components/Form/Button";
import { useRouter } from "next/navigation";
import { DexaLogo } from "@/components/Icons/Others";
import { ArrowDownUpIcon } from "lucide-react";
import Link from "next/link";

const ds = Dancing_Script({
  subsets: ["latin-ext"],
  style: "normal",
  weight: ["400", "500", "600", "700"],
});

export default function Page() {
  const router = useRouter();
  const [text, count] = useTypewriter({
    words: [
      "you own, monetize & control your data.",
      "we empower you to reclaim your digital identity",
      "you have a say in it's development and governance.",
    ],
    loop: true,
    delaySpeed: 6000,
    typeSpeed: 80,
  });

  useEffect(() => {
    router.prefetch("/welcome");
    router.prefetch("/login");
  }, []);

  return (
    <div className="h-svh overflow-y-scroll">
      <div className="bg-primary/10 absolute inset-0 -z-10 flex">
        <div className="flex-1 hidden md:inline bg-quick-view bg-contain"></div>
        <div className="flex-1 bg-white"></div>
      </div>
      <div className="flex h-svh shrink-0">
        <div className="flex-1 w-full hidden md:flex flex-col items-center justify-center pt-5">
          <div className="flex items-center gap-x-2 mb-20">
            <Image
              src={favicon.main}
              width={260}
              height={260}
              alt={`dexa`}
              className="h-14 w-14 border-2 border-white rounded-lg"
            />
            <p className="text-4xl font-black text-light">Dexa.</p>
          </div>
          <div className="px-10 lg:px-20">
            <div className="max-w-2xl mx-auto min-h-[8rem]">
              <p
                className={`text-2xl lg:text-4xl text-center font-semibold text-white`}
              >
                At{" "}
                <span className="bg-white text-primary px-2 font-bold rounded-sm">
                  Dexa
                </span>{" "}
                <span className="text-white">{text}</span>
                <Cursor cursorColor="#fffff" />
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="px-10 lg:px-20 flex-1 h-full flex flex-col justify-between">
            <div className="pt-10 flex justify-center">
              <div className="md:hidden block">
                <DexaLogo />
              </div>
              
              <Image
                src={favicon.main}
                width={260}
                height={260}
                alt={`dexa`}
                className="h-12 w-12 hidden md:block"
              />
            </div>
            <div className="flex-1 items-center flex">
              <div className="w-full max-w-md mx-auto">
                <div className="mb-7 block md:hidden">
                  <p className="text-3xl font-black mb-1">
                    Welcome to <span className="text-primary">Dexa</span>
                  </p>
                  <p className="text-xl text-medium">
                    Own, monetize & control your data.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-5">
                  <Button
                    onClick={() => router.push("/welcome")}
                    type="button"
                    kind="clear"
                    className="py-[0.9rem] rounded-full bg-primary hover:bg-primary/90 text-white border-primary w-full border"
                  >
                    Create Account
                  </Button>
                  <div className="border h-8 w-8 border-primary flex items-center justify-center rounded-full">
                    <ArrowDownUpIcon size={18} className="text-primary" />
                  </div>
                  <Button
                    onClick={() => router.push("/login")}
                    type="button"
                    kind="clear"
                    className="py-[0.9rem] rounded-full bg-white hover:bg-primary/5 text-primary border-primary w-full border"
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </div>

            <div className="py-5 text-center flex flex-col-reverse lg:flex-row items-center gap-x-5 justify-center">
              <p className="text-medium">Copyright &copy; Dexa 2024</p>
              <div className="flex items-center gap-x-5 justify-center">
                <Link href="">Terms</Link>
                <Link href="">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
