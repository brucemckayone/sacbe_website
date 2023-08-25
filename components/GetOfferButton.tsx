"use client";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { useContext, useState } from "react";
import { useUser } from "./auth/affiliate_auth_context";
import PrimaryButton from "./buttons/primaryButton";
import { SearchContext } from "./providers/AffiliatePaymentLinkProvider";

export function GetOfferButton() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { oneofflink, sublink } = useContext(SearchContext);
  if (!oneofflink || !sublink)
    return (
      <>
        <PrimaryButton
          onClicked={async () => {
            setIsLoading(true);
            await createCheckoutSession({
              prices: ["price_1NLYCcG859ZdyFmpgkHOXIUZ"],
              mode: "payment",
              customerId: user.customerId ?? undefined,
              qty: 1,
              discountCode: "first_time_buyer",
            });
            setIsLoading(false);
          }}
          text={isLoading ? "Loading" : "Unlock Offer"}
          isPrimary
          className=" self-center text-center ml-1 mt-1"
        />
        <p className="text-xs ml-1 mb-3 ">
          {" "}
          We are offering a 10% discount to first time buyers
        </p>
      </>
    );
  else return <></>;
}
