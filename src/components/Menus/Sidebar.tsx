"use client";

import {
  BanknoteIcon,
  BellDotIcon,
  BoxIcon,
  CandlestickChart,
  HomeIcon,
  MailIcon,
  PodcastIcon,
  Rows3Icon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Form/Button";
import { favicon } from "../Icons/Connector";

export default function Sidebar() {
  const path = usePathname();

  const navigation = [
    { name: "Home", href: "/home", icon: HomeIcon },
    {
      name: "NFTlies",
      href: "/nftlies",
      icon: BoxIcon,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MailIcon,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: BellDotIcon,
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: BanknoteIcon,
    },
    {
      name: "My Collections",
      href: "/collections",
      icon: Rows3Icon,
    },
    {
      name: "Stats",
      href: "/stats",
      icon: CandlestickChart,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: SettingsIcon,
    },
    {
      name: "Community",
      href: "#",
      icon: UsersIcon,
    },
  ];

  return (
    <div className="border-r border-light h-screen flex flex-col justify-between">
      <div>
        <div className="px-3 pt-3 pb-5 flex xl:justify-start justify-end">
          <Image
            src={favicon.main}
            width={260}
            height={260}
            alt={`dexa`}
            className="h-12 w-12"
          />
        </div>
        <div>
          {navigation.map((nav, idx) => (
            <Link
              href={nav.href}
              key={idx}
              className="flex justify-end xl:justify-start group px-3 md:pl-5 md:pr-5 xl:pl-0 xl:pr-0"
            >
              <div className="flex space-x-2 group-hover:bg-primary/10 transition-all duration-200 rounded-[1.8rem] p-[0.8rem] xl:py-[0.8rem] xl:pl-3 xl:pr-8">
                <nav.icon className="group-hover:text-primary" size={26} />
                <p
                  className={`hidden xl:inline group-hover:text-primary text-lg ${
                    path == nav.href ? "font-bold" : "font-normal"
                  }`}
                >
                  {nav.name}
                </p>
              </div>
            </Link>
          ))}
          <div className="flex justify-end xl:justify-start mt-5 group px-3 md:pr-5 cursor-pointer">
            <div className="flex xl:flex-1 xl:space-x-2 justify-center bg-primary text-white group-hover:bg-primary/90 transition-all duration-200 rounded-[1.8rem] p-[0.8rem]">
              <p className="text-center font-bold text-lg hidden xl:inline">
                Mint
              </p>
              <PodcastIcon size={26} />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
