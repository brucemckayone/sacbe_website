"use client";

import AfilliateSales from "@/components/affiliate/affiliate_sales";
import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";
import PaymentLinks from "./paymentLinks";
import { useUser } from "@/components/auth/affiliate_auth_context";
import AffiliateStatusChecker from "@/components/buttons/getAffiliateLinkButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
            <div className="flex justify-around flex-row mt-10">
              <div className="p-5 rounded-lg shadow bg-tertiaryContainer">
                <h5>Fitness & Preformance</h5>
              </div>
              <div className="p-5 rounded-lg shadow bg-tertiaryContainer">
                <h5>Spiritual</h5>
              </div>
              <div className="p-5 rounded-lg shadow bg-tertiaryContainer">
                <h5>Health & Wellness</h5>
              </div>
            </div>
            <p className="text-sm mt-3">
              Clip one of our cards to copy a link focused on selling our
              product to specific demographic.
            </p>
            <div className="mt-10 flex flex-wrap ">
              <div className=" w-11/12 md:w-1/2">
                <h5>Share Our Articles & Recipes with your link</h5>
                <span className="inline-flex">
                  {" "}
                  <p>
                    look for the
                    <Image
                      src={"/icons/dollar_icon.svg"}
                      alt="dollar icon for affiliate links"
                      height={20}
                      width={20}
                      className="bg-sacbeBrandColor w-10 h-10 drop-shadow-lg rounded-full p-2 mx-3 inline-block "
                    />{" "}
                    at the bottom of an article and click it, then click
                    generate link, now all you have too do is share it with the
                    world
                  </p>
                </span>
              </div>
            </div>
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
