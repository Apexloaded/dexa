import { TwitterIcon, WalletIcon } from "lucide-react";
import Image from "next/image";
import ape1 from "@/assets/nft/1.png";
import NewPost from "@/components/Posts/NewPost";
import Feeds from "@/components/Home/Feeds";
import Section from "@/components/Layouts/Section";
import Aside from "@/components/Layouts/Aside";
import Bucket from "@/components/Auth/Welcome/Bucket";
import QuickView from "@/components/Profile/QuickView";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="flex space-x-5">
      <Section>
        <div className="border-b bg-white/40 z-20 border-light px-3 top-0 sticky">
          <Header title="Feeds" isBack={false} />
        </div>
        <div className="border-b border-light">
          <NewPost />
        </div>
        <Feeds />
      </Section>
      <Aside>
        <div className="w-full p-3 shadow rounded-xl border border-light bg-white dark:bg-gray-700">
          <QuickView />
        </div>
      </Aside>
    </div>
  );
}
