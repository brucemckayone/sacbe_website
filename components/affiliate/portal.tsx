"use client";

import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";
import PaymentLinks from "./paymentLinks";
import { useUser } from "@/components/auth/affiliate_auth_context";
import { useSession } from "next-auth/react";
import PrimaryButton from "../buttons/primaryButton";
import TextInput from "../form/inputs/TextInput";
import { useState } from "react";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

function Portal() {
  const { user: affiliate, isLoading: affiliateLoading } = useUser();

  const session = useSession();

  console.log(affiliate);
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
          <div>
            <span className="flex flex-col md:flex-row justify-between">
              <h1 className="mt-10 w-full md:w-2/6">Affiliate Portal</h1>
              <span className="w-full md:w-4/6">
                <AccountBalanceTabs />
              </span>
            </span>
            <CouponFeild affiliate={affiliate} />
            <PaymentLinks />

            <SetUpAccountButton />
          </div>
        </span>
      );
    }
  }
  return <> </>;
}

interface ICouponFeild {
  affiliate: userType;
}

const CouponFeild = ({ affiliate }: ICouponFeild) => {
  const [couponName, setCouponName] = useState("");

  if (!affiliate.coupon)
    return (
      <div className="border rounded-lg drop-shadow-sm p-2 m-5">
        <h5>{affiliate.coupon}</h5>
      </div>
    );

  if (affiliate.coupon && affiliate.accountId)
    return (
      <div>
        <h5>Create Your coupon</h5>
        <p>Enter whatever code you want</p>
        <TextInput
          placeHolder="Enter Your Coupon"
          value={couponName}
          update={setCouponName}
        />
        <PrimaryButton
          onClicked={() => {
            fetchPostJSON("api/affiliate/coupon", {
              accountId: affiliate.accountId,
              uuid: affiliate.uuid,
              couponName: couponName,
            });
          }}
          text={"Generate Coupon"}
        />
      </div>
    );

  return <></>;
};

export default Portal;
