"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dollarIcon from "@/public/icons/dollar_icon.svg";
import { useUser } from "@/components/shared/auth/UserProvider";
import { LinkElement } from "@/types/affiliatePaymentLinkType";
import homeUrl from "@/lib/constants/urls";
import api from "@/lib/apiSchema/apiSchema";

export function AffiliateCopyLinkButton(props: { url: string }) {
  const { user: affiliate, isLoading: affiliateLoading } = useUser();
  const [linksState, setLinkState] = useState<LinkElement[] | undefined>();

  useEffect(() => {
    let isMounted = true;
    if (affiliate.uuid && affiliate.accountId && affiliate.chargesEnabled) {
      api.affiliate.setup.paymentLinks
        .get({ data: { uuid: affiliate.uuid } })
        .then((res) => {
          if (isMounted && res?.data?.links) {
            setLinkState(res?.data?.links ?? undefined);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [affiliate, affiliateLoading]);

  return (
    <div className="w-full text-end">
      {!affiliateLoading && linksState && (
        <button
          className={`bg-sacbeBrandColor rounded-full drop-shadow-2xl  p-2 }`}
          onClick={async () => {
            const toast = (await import("react-hot-toast")).toast;
            toast.success(
              "Your Link Has Been Copied To Your Clipboard! Now Share it with the world! Best of luck we love you <3"
            );
            // copy text to clipboard current url
            navigator.clipboard.writeText(
              `${homeUrl}${props.url}?sublink=${
                linksState![0].link.url +
                `?prefilled_promo_code=${affiliate.coupon}`
              }&oneofflink=${
                linksState![1].link.url +
                `?prefilled_promo_code=${affiliate.coupon}`
              }`
            );
          }}
        >
          <Image
            src={dollarIcon}
            width={50}
            height={50}
            alt="Shopping bag Icon"
          />
        </button>
      )}
    </div>
  );
}
