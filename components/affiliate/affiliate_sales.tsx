"use client";
import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import { apiBaseUrl } from "next-auth/client/_utils";
import homeUrl from "@/lib/constants/urls";
import React, { useEffect, useState } from "react";
import Stripe from "stripe";
import { RxClipboardCopy } from "react-icons/rx";
interface params {
  accountId: string;
}
async function getUserSales({ accountId }: params) {
  return await fetchGetJSON(`${homeUrl}/api/stripe/payments`);
}

function AfilliateSales({ accountId }: params) {
  const [isLoading, setLoading] = useState(true);
  const [sales, setSales] = useState(
    {} as Stripe.Response<Stripe.ApiList<Stripe.Charge>>
  );
  useEffect(() => {
    console.log("helloo");
    setLoading(true);
    try {
      fetchGetJSON(
        `${homeUrl}/api/stripe/payments?accountId=acct_1MbMvi4ffKpYRYea}`
      ).then((res) => {
        setSales(res);
        console.log(sales);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  } else {
    return (
      <div>
        <table className="w-full text-sm text-left">
          <thead className="bg-primaryContainer  ">
            <tr>
              <th className="mx-2 rounded-tl-md">
                <h5 className="px-2 py-1">ID</h5>
              </th>
              <th className="mx-2">
                <h5>Amount</h5>
              </th>
              <th className="mx-2 rounded-tr-md">
                <h5>Reciept</h5>
              </th>
            </tr>
          </thead>
          {sales.data.map((sale) => {
            return (
              <tbody
                className="bg-white border-b bg-tertiaryContainer border-onTertiaryContainer"
                key={sale.id + "row"}
              >
                <tr>
                  <td className="p-3" key={sale.id}>
                    <p>{sale.id}</p>
                  </td>
                  <td key={sale.amount + sale.id}>
                    {" "}
                    <p>£{(sale.amount / 100).toFixed(2)}</p>
                  </td>
                  <td>
                    <button
                      className=" flex border uppercase rounded-md w-20 px-1 py-1 justify-around"
                      onClick={() => window.open(sale.receipt_url!)}
                    >
                      <p>receipt</p>
                      <RxClipboardCopy size={20} className="pt-1" />
                    </button>{" "}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }

  return <div>{isLoading ? <p>loading</p> : <p>is complete</p>}</div>;
}

export default AfilliateSales;
