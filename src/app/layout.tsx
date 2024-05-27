import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import "./globals.scss";
import HTML from "@/components/HTML";
import { parseCookies } from "nookies";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config/wagmi.config";

export const dynamicParams = true;

const poppins = Reddit_Mono({
  subsets: ["latin-ext"],
  style: "normal",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dexa | Decentralised X",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const parsedCookies = parseCookies();
  const initialState = cookieToInitialState(
    config,
    JSON.stringify(parsedCookies)
  );
  return (
    <HTML font={poppins} initialState={initialState}>
      {children}
    </HTML>
  );
}
