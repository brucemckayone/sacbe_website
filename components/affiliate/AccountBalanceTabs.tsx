"use client";
import React from "react";
import { useEffect, useState } from "react";
import getStripeBalance from "@/utils/server/stripe/account/balance";
import { useUser } from "@/components/auth/affiliate_auth_context";
import HeaderLoader from "@/components/loaders/HeaderLoader";
function AccountBalanceTabs() {
  const { user: affiliate, isLoading: isAffilateLoading } = useUser();
  const [isloading, setIsLoading] = useState(true);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalPending, setTotalpending] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    if (affiliate.chargesEnabled)
      getStripeBalance(affiliate.accountId).then((res) => {
        let available = 0;

        let pending = 0;
        if (res.available)
          for (let i = 0; i < res!.available.length; i++) {
            available = available + res!.available[i].amount;
          }
        if (res.pending)
          for (let i = 0; i < res!.pending.length; i++) {
            pending = pending + res!.pending[i].amount;
          }

        console.log(pending);
        console.log(available);

        setTotalAvailable(available / 100);
        setTotalpending(pending / 100);
      });
    setIsLoading(false);
  }, [affiliate]);
  // return <HeaderLoader />;
  if (isAffilateLoading) {
    return <HeaderLoader />;
  } else
    return (
      <div className="my-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1 animate-slide_in_up_fade my-1 ">
          <div className="p-2 border rounded-lg  drop-shadow-lg">
            <h4 className="text-lg">Available Balance</h4>
            <p>£{totalAvailable.toFixed(2)}</p>
          </div>
          <div className="p-2 border rounded-lg  drop-shadow-lg">
            <h4 className="text-lg">Pending Balance</h4>
            <p>£{totalPending.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
}

export default AccountBalanceTabs;
