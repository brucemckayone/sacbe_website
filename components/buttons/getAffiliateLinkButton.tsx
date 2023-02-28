"use client";

import React, { useRef, useEffect, useState } from "react";
import PrimaryButton from "./primaryButton";
import Card from "../cards/card";
import AffiliateRequestButton from "./AffiliateRequestButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface props {
  link?: string;
  isAffilate: Boolean;
}
function GetAffiliateLinkButton({ link, isAffilate }: props) {
  const [clicked, setClickedState] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState(link);

  const notify = () => toast(" Link copied to clipboard");
  if (isAffilate) {
    if (affiliateLink) {
      return (
        <div
          onClick={() => {
            setClickedState(true);
            navigator.clipboard.writeText(affiliateLink);
            notify();
          }}
        >
          <h5>Sellers Link</h5>
          <div
            className={`m-0 md:mx-20 lg:m-5 p-5 flex-1 justify-between  ${
              !clicked ? "bg-tertiaryContainer " : "bg-recommendedGreen"
            }  rounded-md border-2 duration-500`}
          >
            <p>{affiliateLink}</p>
          </div>
        </div>
      );
    } else {
      return (
        <PrimaryButton
          onClicked={() => {
            setAffiliateLink("https://buy.stripe.com/test_cN2g271tn0wGdm8cMP");
          }}
          text="Generate Link"
        />
      );
    }
  } else {
    return <AffiliateRequestButton />;
  }
}

export default GetAffiliateLinkButton;
