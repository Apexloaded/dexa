"use client";

import React, { useEffect, useState } from "react";
import { StepsNavigation } from "@/components/ui/Step";
import { StepperInterface } from "@/interfaces/stepper.interface";
import { UserRoundPlusIcon } from "lucide-react";
import IndexStepper from "@/components/Auth/Welcome/Index";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";

export default function Welcome() {
  const { profileProgress } = useAuth();
  const [activeStep, setActiveStep] = useState<number>(1);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (profileProgress) {
      if (profileProgress >= 100 && pathname.startsWith("/welcome")) {
        router.replace("/home");
      }
    }
  }, [profileProgress]);

  const updateStep = (step: number) => {
    if (step > steps.length) return;
    setActiveStep(step);
  };

  const [steps] = useState<StepperInterface[]>([
    {
      title: "Hello",
      headline: "Welcome!, let's get your started",
      icons: UserRoundPlusIcon,
      description: "You can always change them later",
    },
    // {
    //   title: "Shelve",
    //   headline: "Decentralised storage",
    //   icons: DatabaseZapIcon,
    //   description: "Let's create an onchain decentralised storage for you",
    // },
  ]);

  return (
    <div className="h-screen w-full overflow-scroll bg-light px-5 md:px-0">
      <div className="max-w-2xl mx-auto h-full">
        <div className="pt-8 pb-10">
          {/* <div className="text-center flex items-center justify-center">
            <Image
              src={logos.main}
              width={260}
              height={45}
              alt={`logo`}
              className="h-10 w-28"
            />
          </div> */}
        </div>
        {steps.length > 1 && (
          <div className="flex justify-center items-center text-center overflow-hidden">
            <StepsNavigation
              steps={steps}
              activeStep={activeStep}
              updateStep={updateStep}
              size="MEDIUM"
              position="CENTER"
            />
          </div>
        )}

        <IndexStepper
          steps={steps}
          activeStep={activeStep}
          updateStep={updateStep}
        ></IndexStepper>
      </div>
    </div>
  );
}
