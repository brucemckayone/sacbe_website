"use client";
import React from "react";
import PrimaryButton from "./primaryButton";

import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import AffiliateRequestButton from "./AffiliateRequestButton";
import { useAffiliate } from "../auth/affiliate_auth_context";

function GetAffiliateLinkButton() {
  const session = useSession();

  const affiliate = useAffiliate();
  // return (
  //   <PrimaryButton
  //     text="Email"
  //     onClicked={() => {
  //       EmailBuilder.sendTransactionalEmail({
  //         htmlContent: "<h1>Hello there this is a tes</h1>",
  //         sender: { email: "bruce.r.mckay@outlook.com", name: "bruce mckay" },
  //         replayTo: { email: "bruce.r.mckay@outlook.com", name: "bruce mckay" },
  //         params: { bodyMessage: "hellow" },
  //         subject: "subject",
  //         to: [{ email: "brucemckayone@gmail.com", name: "bruce" }],
  //       });
  //     }}
  //   />
  // );
  if (session!.data?.user) {
    // set loading state
    if (affiliate.isLoading) {
      return (
        <div>
          <h6>Loading Affiliate Details</h6>
        </div>
      );
    } else {
      if (affiliate.user.accountId) {
        const status = affiliate.user.affiliateStatus.status;
        if (status == "active") {
          window.location.href = "affiliates/portal";
        } else {
          return (
            <div className="bg-tertiaryContainer rounded-lg w-full p-5 border h-36 md:h-28">
              {status == "pending" && (
                <p>Your request has been sent, you should hear from us soon</p>
              )}
              <div className="flex justify-between">
                <div
                  className={`${
                    status == "pending"
                      ? `bg-errorContainer`
                      : "bg-recommendedGreen"
                  } rounded-lg p-2 `}
                >
                  <p>status: {status}</p>
                </div>
              </div>
            </div>
          );
        }
      } else {
        // user has no account id therefore a request needs to be sent
        if (!affiliate.user.affiliateStatus) {
          return <AffiliateRequestButton />;
        } else {
          const status = affiliate.user.affiliateStatus.status;
          if (status == "active") {
            window.location.href = "affiliates/portal";
          }
          return (
            <div className="bg-tertiaryContainer rounded-lg w-full p-5 border h-36 md:h-28">
              {status == "pending" && (
                <p>Your request has been sent, you should hear from us soon</p>
              )}
              <div className="flex justify-between">
                <div
                  className={`${
                    status == "pending"
                      ? `bg-errorContainer`
                      : "bg-recommendedGreen"
                  } rounded-lg p-2 `}
                >
                  <p>status: {status}</p>
                </div>
              </div>
              {/* {status == "active" && (
                <PrimaryButton onClicked={() => {}} text="Open Portal" />
              )} */}
            </div>
          );
        }
      }
      return <> </>;
    }
  } else {
    return (
      <div className="flex-row justify-center ">
        <PrimaryButton
          text="Log In to send request"
          onClicked={() => (window.location.href = "/api/auth/signin")}
        />
      </div>
    );
  }
}

export default GetAffiliateLinkButton;
