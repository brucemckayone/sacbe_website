"use client";

import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";
import PaymentLinks from "./paymentLinks";
import { useUser } from "@/components/auth/affiliate_auth_context";
import { useSession } from "next-auth/react";

function Portal() {
  const { user: affiliate, isLoading: affiliateLoading } = useUser();
  const session = useSession();

  if (session!.data?.user) {
    // set loading state
    if (affiliateLoading) {
      return (
        <div>
          <h6>Loading Affiliate Details</h6>
        </div>
      );
    } else {
      return (
        <span>
          <div className="mx-10 ">
            <span className="flex flex-col md:flex-row justify-between">
              <h1 className="mt-10 w-full md:w-2/6">Affiliate Portal</h1>
              <span className="w-full md:w-4/6">
                <AccountBalanceTabs />
              </span>
            </span>
            <PaymentLinks />

            <SetUpAccountButton />
          </div>
        </span>
      );
    }
  }
  return <> </>;
}

export default Portal;
