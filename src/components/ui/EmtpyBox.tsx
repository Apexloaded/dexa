import React from "react";
import Lottie from "lottie-react";
import emptyAnim from "@/assets/lottie/empty.json";

type Props = {
  title?: string;
  message?: string;
};

const header = "Tab is empty";
const msg = "There nothing in this folder, kindly check back later";

function EmtpyBox({ title = header, message = msg }: Props) {
  return (
    <div className="py-20 text-center bg-primary/5">
      <p className="text-2xl">{title}</p>
      <Lottie animationData={emptyAnim} className="my-3 h-60" />
      <p className="text-medium">{message}</p>
    </div>
  );
}

export default EmtpyBox;
