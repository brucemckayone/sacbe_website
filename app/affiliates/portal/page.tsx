"use client";

import AfilliateSales from "@/components/affiliate/affiliate_sales";
import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";
import PaymentLinks from "./paymentLinks";
import Footer from "@/components/footer";
import NavMenuBottom from "@/components/menu/NavMenuBottom";

function Portal() {
  return (
    <span>
      <div className="md:mx-20 lg:mx-52 mx-2">
        <AccountBalanceTabs />
        <PaymentLinks />
        <SetUpAccountButton />
        <AfilliateSales />
      </div>
      <Footer />
      <NavMenuBottom></NavMenuBottom>
    </span>
  );
}

export default Portal;
