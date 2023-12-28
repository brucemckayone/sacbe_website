"use client";
import { useUser } from "@/components/shared/auth/UserProvider";
import ButtonLoader from "@/components/shared/loaders/ButtonLoader";
import { SearchContext } from "@/components/providers/AffiliatePaymentLinkProvider";
import { buyOneTimeCacao } from "@/lib/stripe/checkout/buyOneTimeCacao";
import { buySubscriptionSecondClass } from "@/lib/stripe/checkout/subscriptionCheckout";
import React, { useContext, useState } from "react";

export function BuyCacaoLink(props: { text: string; isSubscription: boolean }) {
  const [isLoading, setLoading] = useState(false);
  const { oneofflink, sublink } = useContext(SearchContext);
  const user = useUser();

  return (
    <span className="inline-flex">
      <p>
        {props.text}{" "}
        {isLoading ? (
          <ButtonLoader />
        ) : (
          <span>
            <button className="rounded-lg" onClick={purchase()}>
              <p className="underline hover:text-sacbeBrandColor">
                Buy Sacbe Cacao
              </p>
            </button>
          </span>
        )}
      </p>
    </span>
  );

  function purchase(): React.MouseEventHandler<HTMLButtonElement> | undefined {
    return async () => {
      setLoading(true);
      if (props.isSubscription) {
        if (sublink) {
          window.open(sublink, "_blank");
        } else {
          await buySubscriptionSecondClass(user.user, 1);
        }
      } else {
        if (oneofflink) {
          window.open(oneofflink, "_blank");
        } else {
          await buyOneTimeCacao(user.user, 1);
        }
      }
      setLoading(false);
    };
  }
}
