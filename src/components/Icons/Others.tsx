import Image from "next/image";
import { favicon } from "./Connector";
import Link from "next/link";

export function Diamond({
  height = "25",
  width = "25",
}: {
  height?: string;
  width?: string;
}) {
  return (
    <svg
      height={height}
      width={width}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className="animate-pulse"
    >
      <path
        style={{ fill: "#FFD782" }}
        d="M256,512c-121.3,0-219.985-98.686-219.985-219.985c0-121.3,98.685-219.986,219.985-219.986
	s219.985,98.686,219.985,219.986C475.985,413.315,377.3,512,256,512z M256,143.851c-81.698,0-148.163,66.466-148.163,148.164
	S174.303,440.178,256,440.178s148.163-66.466,148.163-148.163C404.164,210.317,337.698,143.851,256,143.851z"
      />
      <path
        style={{ opacity: "0.1" }}
        d="M118.683,120.285l46.152,55.012c25.157-19.693,56.814-31.446,91.165-31.446
	s66.008,11.753,91.165,31.446l46.152-55.012C355.655,90.109,307.903,72.03,256,72.03C204.097,72.029,156.345,90.108,118.683,120.285
	z"
      />
      <polygon
        style={{ fill: "#99E7FF" }}
        points="222.15,0 187.891,74.189 324.109,74.189 289.85,0 "
      />
      <polygon
        style={{ fill: "#8AD0E6" }}
        points="289.85,0 289.85,0 324.109,74.189 324.109,74.189 392.928,74.189 348.731,0 "
      />
      <polygon
        style={{ fill: "#B3EDFF" }}
        points="222.15,0 222.15,0 163.269,0 119.072,74.189 187.891,74.189 187.891,74.189 "
      />
      <polygon
        style={{ fill: "#99E7FF" }}
        points="324.109,74.189 256,237.402 392.928,74.189 "
      />
      <polygon
        style={{ fill: "#8AD0E6" }}
        points="187.891,74.189 119.072,74.189 256,237.402 "
      />
      <polygon
        style={{ fill: "#B3EDFF" }}
        points="187.891,74.189 256,237.404 324.109,74.189 "
      />
    </svg>
  );
}

export function DexaLogo() {
  return (
    <Link href={"/"} prefetch={true} className={`flex items-center gap-x-1`}>
      <Image
        src={favicon.main}
        width={260}
        height={260}
        alt={`dexa`}
        className="h-12 w-12"
      />
      <p className="text-3xl font-black text-primary">Dexa</p>
    </Link>
  );
}
