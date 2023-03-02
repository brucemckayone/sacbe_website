"use client";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useAffiliate } from "../auth/affiliate_auth_context";
import PrimaryButton from "./primaryButton";

function AffiliateRequestButton() {
  const affiliate = useAffiliate();
  const { data: data } = useSession();
  let marketingDetails: marketingType = {};
  let message: string = "";

  useEffect(() => {}, []);

  if (
    !affiliate.user.accountId &&
    !affiliate.user.affiliateRequest &&
    data?.user
  ) {
    return (
      <PrimaryButton
        onClicked={() => {
          if (
            !affiliate.user.accountId &&
            !affiliate.user.affiliateRequest.refId
          ) {
            fetchPostJSON("api/affiliate/request", {
              marketing: marketingDetails,
              email: data?.user?.email,
              message: message,
            });
          }
        }}
        text="Send Request"
        className="mx-20 my-4"
      ></PrimaryButton>
    );
  } else if (
    data?.user && //user is logged in
    affiliate.user.affiliateRequest && // has request id
    !affiliate.user.accountId // and does not have an account id
  ) {
  }
  return <> </>;
}

export default AffiliateRequestButton;
