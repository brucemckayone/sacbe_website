"use client";
import React from "react";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import getStripeBalance from "@/utils/server/stripe/account/balance";
import { useAffiliate } from "@/components/auth/affiliate_auth_context";
import HeaderLoader from "@/components/loaders/HeaderLoader";
function AccountBalanceTabs() {
  const { user: affiliate, isLoading: isAffilateLoading } = useAffiliate();
  const [isloading, setIsLoading] = useState(true);

  const [balance, setBalance] = useState<Stripe.Balance>();
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalPending, setTotalpending] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    if (affiliate.chargesEnabled)
      getStripeBalance(affiliate.accountId).then((res) => {
        setBalance(res);

        let value = 0;
        balance?.available.forEach((balance) => {
          value = +balance.amount;
        });
        let pending = 0;
        balance?.pending.forEach((balance) => {
          pending = +balance.amount;
        });

        setTotalAvailable(value);
        setTotalpending(pending);
      });
    setIsLoading(false);
  }, [affiliate]);
  // return <HeaderLoader />;
  if (isAffilateLoading) {
    return <HeaderLoader />;
  } else
    return (
      <div className="my-10">
        <h4>My Balances</h4>
        <p>How much money is waiting in your account</p>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1 animate-slide_in_up_fade my-1 ">
          <div className="p-2 bg-secondaryContainer rounded-lg  shadow-lg">
            <h5 className="text-base">Avialable Balance</h5>
            <p>£{totalAvailable.toFixed(2)}</p>
          </div>
          <div className="p-2 bg-secondaryContainer rounded-lg  shadow-lg">
            <h5 className="text-base">Pending Balance</h5>
            <p>£{totalPending.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
}

export default AccountBalanceTabs;
