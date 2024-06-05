"use client";

import React from "react";
import { formatCur, weiToUnit } from "@/libs/helpers";
import { UserBalance } from "@/interfaces/user.interface";
import EmptyBox from "../ui/EmptyBox";
import { useAppSelector } from "@/hooks/redux.hook";
import { selectHideBalance } from "@/slices/account/hide-balance.slice";

type Props = {
  balances: UserBalance[];
};

function AssetsTable({ balances }: Props) {
  const isHidden = useAppSelector(selectHideBalance);

  return (
    <table className="table-fixed w-full">
      <thead className="bg-light px-4">
        <tr className="h-14 text-left">
          <th className="px-4 text-medium text-sm">Coin</th>
          <th className="px-4 text-medium text-sm">Total</th>
          <th className="px-4 text-medium text-sm">Available Amount</th>
          <th className="px-4 text-medium text-sm">Operations</th>
        </tr>
      </thead>
      <tbody>
        {balances.length > 0 ? (
          <>
            {balances.map((bal, index) => (
              <tr
                className="h-14 border-b border-light last-of-type:border-none"
                key={index}
              >
                <td className="px-4">
                  <div className="flex items-center gap-x-2">
                    {bal.icon && <bal.icon height="30" width="30" />}
                    <div>
                      <p className="text-sm font-bold">{bal.symbol}</p>
                      <p className="text-xs text-medium">{bal.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4">
                  {isHidden ? (
                    <div>
                      <p className="text-sm font-bold">******</p>
                      <p className="text-xs text-medium">*****</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold">
                        {Number(bal.balance) > 0
                          ? weiToUnit(bal.balance)
                          : "0.00"}
                      </p>
                      {bal.usdValue && (
                        <p className="text-xs text-medium">
                          ={formatCur(bal.usdValue)} USD
                        </p>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4">
                  {isHidden ? (
                    <div>
                      <p className="text-sm font-bold">******</p>
                      <p className="text-xs text-medium">*****</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold">
                        {Number(bal.balance) > 0
                          ? weiToUnit(bal.balance)
                          : "0.00"}
                      </p>
                      {bal.usdValue && (
                        <p className="text-xs text-medium">
                          ={formatCur(bal.usdValue)} USD
                        </p>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4">
                  <div className="flex gap-x-1 items-center">
                    <p
                      role="button"
                      className="text-sm font-bold text-primary p-2"
                    >
                      Withdraw
                    </p>
                    <p
                      role="button"
                      className="text-sm font-bold text-primary p-2"
                    >
                      Transfer
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td colSpan={4}>
              <EmptyBox
                title="No Assets"
                message="You currently do not have any asset"
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AssetsTable;
