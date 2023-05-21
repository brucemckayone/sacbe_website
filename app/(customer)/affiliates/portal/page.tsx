"use client";

import AfilliateSales from "@/components/affiliate/affiliate_sales";
import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";
import PaymentLinks from "./paymentLinks";
import { useUser } from "@/components/auth/affiliate_auth_context";
import AffiliateStatusChecker from "@/components/buttons/getAffiliateLinkButton";
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
          <div className="  mx-2">
            <h1 className="mt-10">Affiliate Portal</h1>
            <AccountBalanceTabs />
            <PaymentLinks />
            <SetUpAccountButton />
            <AfilliateSales />
          </div>
        </span>
      );
    }
  }
  return <> </>;
}

export default Portal;
