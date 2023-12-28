"use client";
import { getOneTimeId } from "@/lib/constants/stripe/productids";
import createCheckoutSession from "@/lib/stripe/checkout/createCheckoutSession";
import testSwitch from "@/utils/test/TestSwitch";
import { useState } from "react";
import { useUser } from "../../shared/auth/UserProvider";
import PrimaryButton from "../../shared/buttons/primaryButton";

export function UnlockOfferButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  return (
    <PrimaryButton
      text={isLoading ? "Loading..." : "Unlock Offer"}
      onClicked={async () => {
        setIsLoading(true);
        await createCheckoutSession({
          prices: getOneTimeId() as string[],
          mode: "payment",
          customerId: user.customerId ?? undefined,
          qty: 1,
          discountCode: testSwitch({ live: "wIrTDDDg", test: "aqhZ2D8k" }),
        });
        setIsLoading(false);
      }}
    />
  );
}
