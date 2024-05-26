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

const ds = Dancing_Script({
  subsets: ["latin-ext"],
  style: "normal",
  weight: ["400", "500", "600", "700"],
});

export default function Page() {
  const router = useRouter();
  const [width, setWidth] = useState(0);
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

  const imageArr = [
    {
      image: ape1,
      name: "Dexa Trent",
      username: "DexaTrent",
    },
    {
      image: ape2,
      name: "Elon Quill",
      username: "ElonQuill",
    },
    {
      image: ape3,
      name: "Nifty Blake",
      username: "NiftyBlake",
    },
    {
      image: ape4,
      name: "Juno Hale",
      username: "JunoHale",
    },
    {
      image: ape5,
      name: "Riva Penn",
      username: "RivaPenn",
    },
    {
      image: ape6,
      name: "Kael Fynn",
      username: "KaelFynn",
    },
    {
      image: ape7,
      name: "Lyra Moss",
      username: "LyraMoss",
    },
  ];

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    router.prefetch("/welcome");
    router.prefetch("/login");
  }, []);

  return (
    <div className="px-5 h-svh overflow-y-scroll max-w-4xl mx-auto">
      <div className="bg-primary/10 absolute inset-0 -z-10 flex">
        <div className="flex-1"></div>
        <div className="flex-1 bg-white hidden md:inline"></div>
      </div>
      <div className="flex justify-between py-5 z-50">
        <DexaLogo />
      </div>
      <div className="pt-10 z-50">
        <div className="max-w-2xl mx-auto min-h-[5rem]">
          <p className={`text-2xl md:text-4xl text-center font-semibold text-dark`}>
            At <span className="text-primary">Dexa,</span>{" "}
            <span className="text-dark">{text}</span>
            <Cursor cursorColor="#020617" />
          </p>
        </div>

        <Swiper
          modules={[EffectCoverflow, Autoplay, Zoom]}
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={width < 768 ? 1 : 4.1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3.9,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            320: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
          }}
          className=""
        >
          {imageArr.map((img, i) => (
            <SwiperSlide
              key={i}
              className="rounded-xl bg-white border-4 border-dark/40 overflow-hidden shadow-2xl my-20"
            >
              <div>
                <Image src={img.image} height={400} width={400} alt="image" className="object-cover" />
                <div className="flex items-center gap-x-2 bg-white my-2 px-2">
                  <Image
                    src={img.image}
                    height={400}
                    width={400}
                    alt="image"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{img.name}</p>
                    <p className="text-medium text-sm lowercase">
                      @{img.username}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex pb-20 flex-col md:flex-row items-center gap-5 justify-center">
        <Button
          onClick={() => router.push("/welcome")}
          type="button"
          kind="clear"
          shape={"ROUNDED"}
          className="py-[0.8rem] w-full md:w-[15rem] bg-primary text-white border-primary px-[3rem] border"
        >
          Create Account
        </Button>
        <Button
          onClick={() => router.push("/login")}
          type="button"
          kind="clear"
          shape={"ROUNDED"}
          className="py-[0.8rem] w-full md:w-[15rem] bg-white text-primary border-primary px-[3rem] border"
        >
          Sign in
        </Button>
      </div>
      {/* <div className="flex shrink-0 max-w-6xl mx-auto h-full">
        <div className="flex-1 w-full flex flex-col pt-5">
          <div className="flex items-center gap-x-1">
            <Image
              src={favicon.main}
              width={260}
              height={260}
              alt={`dexa`}
              className="h-12 w-12"
            />
            <p className="text-3xl font-black text-primary">Dexa</p>
          </div>
          <div className="flex-1 items-center flex">
            <Lottie animationData={dbAnim} />
          </div>
        </div>
        <div className="flex-1 w-full flex items-center">
          <div>
            <p className={`text-7xl font-black text-dark`}>
              Welcome to <span className="text-primary">Dexa</span>
              <Cursor cursorColor="#4338ca" />
            </p>
            <p></p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
