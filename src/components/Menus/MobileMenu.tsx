import React from "react";
import Button from "../Form/Button";
import { BellIcon, BoxIcon, HomeIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ape1 from "@/assets/nft/1.png";

function MobileMenu() {
  return (
    <div className="h-14 xs:hidden bg-white/80 shadow-sm border-t border-light absolute w-full -bottom-0">
      <div className="px-5 flex items-center h-full justify-between">
        <Button
          type={"button"}
          kind={"default"}
          shape={"CIRCLE"}
          className="bg-transparent"
          hoverColor={false}
        >
          <HomeIcon height={23} />
        </Button>
        <Button
          type={"button"}
          kind={"default"}
          shape={"CIRCLE"}
          className="bg-transparent"
          hoverColor={false}
        >
          <MailIcon height={23} />
        </Button>
        <Button
          type={"button"}
          kind={"default"}
          shape={"CIRCLE"}
          className="bg-transparent"
          hoverColor={false}
        >
          <BoxIcon height={23} />
        </Button>
        <Button
          type={"button"}
          kind={"default"}
          shape={"CIRCLE"}
          className="bg-transparent"
          hoverColor={false}
        >
          <BellIcon height={23} />
        </Button>
        <Link href="" className="sticky top-0">
          <div className="hover:bg-dark/20 cursor-pointer h-8 w-8 rounded-full absolute"></div>
          <Image
            height={100}
            width={100}
            alt=""
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-700"
            src={ape1}
          />
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
