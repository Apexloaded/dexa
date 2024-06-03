"use client";

import Section from "@/components/Layouts/Section";
import Bucket from "@/components/Auth/Welcome/Bucket";
import { Suspense } from "react";
import Button from "@/components/Form/Button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useDexa } from "@/context/dexa.context";
import AuthMainLayout from "@/components/Layouts/AuthMainLayout";

export default function Settings() {
  return (
    <AuthMainLayout>
      <div className="flex space-x-5">
        <Section>
          <Suspense></Suspense>
        </Section>
      </div>
    </AuthMainLayout>
  );
}