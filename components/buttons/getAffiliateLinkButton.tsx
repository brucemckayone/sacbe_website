"use client";
import React, { useEffect, useState, useContext } from "react";
import PrimaryButton from "./primaryButton";

import AffiliateRequestButton from "./AffiliateRequestButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import homeUrl from "@/lib/constants/urls";
import { useAffiliate } from "../auth/affiliate_auth_context";
interface props {
  link?: string;
}
function GetAffiliateLinkButton({ link }: props) {
  const [clicked, setClickedState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState(link);
  const notify = () => toast("Link copied to clipboard");

  const session = useSession();
  const [accoundId, setAccountId] = useState("");
  const affiliate = useAffiliate();

  useEffect(() => {
    if (!affiliate) {
      console.log(`session: ${session}`);
      setIsLoading(true);
      if (session.data?.user) {
        fetchPostJSON(`${homeUrl}/api/affiliate/id`, {
          email: session.data?.user?.email,
        }).then((res) => {
          setAccountId(res["accountId"]);
        });
      }
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>{affiliate.user.affiliateRequest.status}</h1>
    </div>
  );
  // if (session!.data?.user) {
  //   console.log("has session");

  //   if (isLoading) {
  //     console.log("is loading");

  //     return (
  //       <div>
  //         <h6>loading link ...</h6>
  //       </div>
  //     );
  //   } else {
  //     console.log("loading complete");

  //     if (accoundId) {
  //       console.log("has account id");

  //       if (affiliateLink) {
  //         console.log("has link");

  //         return (
  //           <div
  //             onClick={() => {
  //               setClickedState(true);
  //               navigator.clipboard.writeText(affiliateLink);
  //               notify();
  //             }}
  //           >
  //             <h5>Sellers Link</h5>
  //             <div
  //               className={`m-0 md:mx-20 lg:m-5 p-5 flex-1 justify-between  ${
  //                 !clicked ? "bg-tertiaryContainer " : "bg-recommendedGreen"
  //               }  rounded-md border-2 duration-500`}
  //             >
  //               <p>{affiliateLink}</p>
  //             </div>
  //           </div>
  //         );
  //       } else {
  //         console.log("has no link");

  //         return (
  //           <PrimaryButton
  //             onClicked={() => {
  //               setAffiliateLink(
  //                 "https://buy.stripe.com/test_cN2g271tn0wGdm8cMP"
  //               );
  //             }}
  //             text="Generate Link"
  //           />
  //         );
  //       }
  //     } else {
  //       console.log("has no account id");
  //       return <AffiliateRequestButton />;
  //     }
  //   }
  // } else {
  //   return (
  //     <PrimaryButton
  //       text="Log In to send request"
  //       onClicked={() => (window.location.href = "/api/auth/signin")}
  //     />
  //   );
  // }
}

export default GetAffiliateLinkButton;
