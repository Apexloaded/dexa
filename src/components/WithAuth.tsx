"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function WithAuth(Component: any) {
  return function withAuth(props: any) {
    const { isConnected } = useAccount();

    useEffect(() => {
      if (!isConnected) {
        redirect("/login");
      }
    }, []);

    if (!isConnected) return;

    return <Component {...props} />;
  };
}
