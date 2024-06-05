"use client";

import React, { useEffect, useState } from "react";
import {
  formatCur,
  formatWalletAddress,
  timestampToDate,
  toOxString,
  weiToUnit,
} from "@/libs/helpers";
import { UserBalance } from "@/interfaces/user.interface";
import EmptyBox from "../ui/EmptyBox";
import { useAppSelector } from "@/hooks/redux.hook";
import { selectHideBalance } from "@/slices/account/hide-balance.slice";
import { useDexa } from "@/context/dexa.context";
import { useAuth } from "@/context/auth.context";
import { useReadContract } from "wagmi";
import { ITransaction, txType } from "@/interfaces/transaction.interface";
import Moment from "react-moment";
import { Tokens } from "@/config/tokens";

function ListTransactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { dexaCreator, CreatorABI } = useDexa();
  const { user } = useAuth();
  const { data } = useReadContract({
    abi: CreatorABI,
    address: dexaCreator,
    functionName: "getUserTransactions",
    account: toOxString(user?.wallet),
    query: {
      enabled: !!user?.wallet,
    },
  });

  useEffect(() => {
    if (data) {
      const txData = data as ITransaction[];
      const mappedTx = txData
        .sort((a, b) => {
          const dateA = timestampToDate(a.txDate).getTime();
          const dateB = timestampToDate(b.txDate).getTime();
          return dateB - dateA;
        })
        .map((tx) => {
          const { txDate, txId, coin, ...payload } = tx;
          const token = Tokens.find((t) => t.address == tx.tokenAddress);
          return {
            txId: Number(txId),
            txDate: timestampToDate(txDate).toISOString(),
            coin: token,
            ...payload,
          } as ITransaction;
        });
      setTransactions(mappedTx);
    }
  }, [data]);

  return (
    <div className="flex-1 overflow-auto">
      <table className="table-fixed xl:w-full">
        <thead className="bg-light px-4">
          <tr className="h-14 text-left">
            <th className="px-4 text-medium text-sm w-14 text-center"></th>
            <th className="px-4 text-medium text-sm w-32">Type</th>
            <th className="px-4 text-medium text-sm">From</th>
            <th className="px-4 text-medium text-sm">To</th>
            <th className="px-4 text-medium text-sm w-24">Amount</th>
            <th className="px-4 text-medium text-sm w-20">Fee</th>
            <th className="px-4 text-medium text-sm w-32">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            <>
              {transactions.map((tx, index) => (
                <tr
                  className="h-14 border-b border-light last-of-type:border-none"
                  key={index}
                >
                  <td className="px-4">
                    <p className="text-sm text-center">{<tx.coin.icon />}</p>
                  </td>
                  <td className="px-4">
                    <p className="text-sm">{txType[tx.txType]}</p>
                  </td>
                  <td className="px-4">
                    <p className="text-sm">
                      {formatWalletAddress(tx.txFrom, "...", 10, 10)}
                    </p>
                  </td>
                  <td className="px-4">
                    <p className="text-sm">
                      {formatWalletAddress(tx.txTo, "...", 10, 10)}
                    </p>
                  </td>
                  <td className="px-4">
                    <p className="text-sm">
                      {Number(tx.txAmount) > 0
                        ? weiToUnit(tx.txAmount)
                        : "0.00"}
                    </p>
                  </td>
                  <td className="px-4">
                    <p className="text-sm">
                      {Number(tx.txFee) > 0 ? weiToUnit(tx.txFee) : "0"}
                    </p>
                  </td>
                  <td className="px-4">
                    <p className="text-sm">
                      <Moment fromNow>{tx.txDate}</Moment>
                    </p>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={4}>
                <EmptyBox
                  title="No Transaction"
                  message="You currently do not have any transaction"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListTransactions;
