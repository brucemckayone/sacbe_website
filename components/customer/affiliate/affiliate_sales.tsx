"use client";
import React, { useState } from "react";
import { RxClipboardCopy } from "react-icons/rx";
import { useUser } from "../../shared/auth/UserProvider";
import useSWR from "swr";
import getAffiliateSales from "@/lib/stripe/payments/getAffiliateSales";
import TableLoader from "../../shared/loaders/TableLoader";
import SlideInUp from "../../animations/slide_in_up";
import getAffiliatePayouts from "@/lib/stripe/links/getAffiliatePayouts";

async function fetchData(accountId: string) {
  return await Promise.all([
    getAffiliatePayouts(accountId),
    getAffiliateSales(accountId),
  ]);
}

function AfilliateSales() {
  const { user: affiliate, isLoading: isLoadingAffiliate } = useUser();
  const [salesFocus, setSalesFocus] = useState(true);
  const [payoutFocus, setPayoutFocus] = useState(false);

  function setTabFocus(setFocus: (data: boolean) => void) {
    setSalesFocus(false);
    setPayoutFocus(false);
    setFocus(true);
  }

  const {
    isLoading,
    data: data,
    error,
  } = useSWR(affiliate.accountId, fetchData);

  if (isLoadingAffiliate || isLoading) {
    return <TableLoader />;
  } else {
    console.log(data);

    const sales = data?.[1].data;
    const payouts = data?.[0].data.data;

    return (
      <div className="overflow-x-auto md:m-20 my-10 z- min-h-min">
        <div className="flex flex-row mt-2">
          <button
            onClick={() => {
              setTabFocus(setSalesFocus);
            }}
            className={` rounded-t-md p-2 ${
              salesFocus
                ? "bg-primaryContainer  scale-105 relative"
                : "bg-tertiaryContainer"
            }`}
          >
            <p>Sales</p>
          </button>
          <button
            className={` rounded-t-md p-2 ${
              payoutFocus
                ? "bg-primaryContainer  scale-105 relative"
                : "bg-tertiaryContainer"
            }`}
            onClick={() => {
              setTabFocus(setPayoutFocus);
            }}
          >
            <p>Payouts</p>
          </button>
        </div>
        {salesFocus && (
          <div className="shadow-lg">
            <SlideInUp animiation="animate-slide_in_left_blur">
              <table className="w-full text-sm text-left table-auto overflow-scroll z-1 shadow-xl">
                <thead className="bg-primaryContainer   ">
                  <tr>
                    <th className="mx-2 rounded-tl-md">
                      <h5 className="px-2 py-1">Customer</h5>
                    </th>
                    <th className="mx-2">
                      <h5>Amount</h5>
                    </th>
                    <th className="mx-2 rounded-tr-md">
                      <h5>Reciept</h5>
                    </th>
                  </tr>
                </thead>
                {sales?.map((sale: any) => {
                  return (
                    <tbody
                      className="bg-white bg-surface hover:bg-transparent border-onTertiaryContainer duration-300 shadow-lg"
                      key={sale.id + "row"}
                    >
                      <tr className="border-b border-primaryContainer">
                        <td className="p-6" key={sale.id}>
                          <p>{sale.receipt_email}</p>
                        </td>
                        <td key={sale.amount + sale.id}>
                          {" "}
                          <p>
                            £
                            {sale.application_fee_amount
                              ? (
                                  sale.amount / 100 -
                                  sale.application_fee_amount / 100
                                ).toFixed(2)
                              : (sale.amount / 100).toFixed(2)}
                          </p>
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
            </SlideInUp>
          </div>
        )}
        {payoutFocus && (
          <div className="shadow-lg">
            <SlideInUp animiation="animate-slide_in_left_blur">
              <div className="shadow-xl">
                <table className="w-full text-sm text-left table-auto overflow-scroll z-50  rounded-l-xl ">
                  <thead className="bg-primaryContainer ">
                    <tr>
                      <th className="mx-2 rounded-tl-md">
                        <h5 className="px-2 py-1">Amount</h5>
                      </th>
                      <th className="mx-2">
                        <h5>Status</h5>
                      </th>
                      <th className="mx-2">
                        <h5>Currancy</h5>
                      </th>
                      <th className="mx-2 rounded-tr-md">
                        <h5>Arv. Date</h5>
                      </th>
                    </tr>
                  </thead>
                  {payouts?.map((payout: any) => {
                    return (
                      <tbody
                        className="bg-white  bg-tertiaryContainer border-onTertiaryContainer shadow-lg"
                        key={payout.id + "row"}
                      >
                        <tr>
                          <td className="p-3" key={payout.id}>
                            <p>£{(payout.amount / 100).toFixed(2)}</p>
                          </td>
                          <td key={payout.status + payout.arrival_date}>
                            <div
                              className={`rounded-md mx-2 text-center ${
                                payout.status == "paid"
                                  ? "bg-recommendedGreen"
                                  : "bg-errorContainer"
                              }`}
                            >
                              <p>{payout.status}</p>
                            </div>
                          </td>
                          <td
                            className="p-3"
                            key={payout.description + payout.id}
                          >
                            <p>{payout.currency.toUpperCase()}</p>
                          </td>
                          <td>
                            <p>
                              {new Date(
                                payout.arrival_date * 1000
                              ).toDateString()}
                              .
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </SlideInUp>
          </div>
        )}
        {sales?.length == 0 && (
          <div>
            {" "}
            <p>
              You can see your purchase history here when you get some sales
            </p>
          </div>
        )}
      </div>
    );
  }
  return <></>;
}

export default AfilliateSales;
