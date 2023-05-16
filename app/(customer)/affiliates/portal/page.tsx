"use client";

import AfilliateSales from "@/components/affiliate/affiliate_sales";
import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";
import PaymentLinks from "./paymentLinks";
import { useAffiliate } from "@/components/auth/affiliate_auth_context";
import GetAffiliateLinkButton from "@/components/buttons/getAffiliateLinkButton";

function Portal() {
  const { user: affiliate, isLoading: affiliateLoading } = useAffiliate();

  if (!affiliate.accountId) return <GetAffiliateLinkButton />;

  return (
    <span>
      <div className="  mx-2">
        <AccountBalanceTabs />
        <PaymentLinks />
        <SetUpAccountButton />
        <AfilliateSales />
      </div>
    </span>
  );
}

export default Portal;
