import { weiToUnit } from "@/libs/helpers";
import React from "react";

type Props = {
  balance: string;
  icon?: React.JSX.Element;
};

function QuickViewBal({ balance, icon }: Props) {
  return (
    <>
      <p className="flex items-center gap-1">
        <span className="text-3xl font-semibold">
          {Number(balance) > 0 ? weiToUnit(balance) : "0.00"}
        </span>
        {icon}
      </p>
      <p className="text-sm font-light">$0.00</p>
    </>
  );
}

export default QuickViewBal;
