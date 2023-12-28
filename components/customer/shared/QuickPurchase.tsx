"use client";
import { useUser } from "@/components/shared/auth/UserProvider";
import { LinkElement } from "@/types/affiliatePaymentLinkType";

import Hamburger from "hamburger-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PurchaseOptions from "./PurchaseOptions";
import dollarIcon from "@/public/icons/dollar_icon.svg";
import shoppingBag from "@/public/icons/shopping_bag_icon.svg";
import dynamic from "next/dynamic";
import { RawUnlockOfferButton } from "@/components/shared/buttons/GetOfferButton";
import api from "@/lib/apiSchema/apiSchema";
import { usePathname } from "next/navigation";

export const QuickPurchase = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { user: affiliate, isLoading: affiliateLoading } = useUser();

  const [linksState, setLinksState] = useState<LinkElement[]>();

  const RiskApealCards = dynamic(() =>
    import("./RiskApealCards").then((res) => res.RiskApealCards)
  );

  useEffect(() => {
    let isMounted = true;
    if (affiliate.uuid && affiliate.accountId && affiliate.chargesEnabled) {
      api.affiliate.setup.paymentLinks
        .get({ data: { uuid: affiliate.uuid } })
        .then((res) => {
          if (isMounted && res?.data?.links) {
            setLinksState(res?.data?.links ?? undefined);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [affiliate, affiliateLoading]);

  if (path?.includes("training") || path?.includes("quiz")) {
    return <></>;
  }

  return (
    <div>
      <button
        className={`fixed bottom-5 right-5 bg-sacbeBrandColor rounded-full drop-shadow-2xl animate-float }`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Image
          src={shoppingBag}
          width={70}
          height={70}
          alt="Shopping bag Icon"
        />
      </button>

      {!affiliateLoading && linksState && (
        <button
          className={`fixed bottom-5 right-24 bg-sacbeBrandColor rounded-full drop-shadow-2xl animate-float p-2 }`}
          onClick={async () => {
            const url = window.location.href;
            const toast = (await import("react-hot-toast")).toast;
            toast.success(
              "Your Link Has Been Copied To Your Clipboard! Now Share it with the world! Best of luck we love you <3"
            );
            // copy text to clipboard current url
            navigator.clipboard.writeText(
              `${url}?sublink=${
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
      <div className="animate-slide_in_left_blur_delay fixed bottom-3 left-0 m-4 z-50 border-black">
        <RawUnlockOfferButton />
      </div>
      <div
        className={`shadow-lg border-t-2 border-r-2 duration-700 border-l-2 rounded-md p-1 h-[80vh] overflow-scroll md:h-[90%]  z-50 fixed md:right-0 bottom-0 z-100 bg-surface md:w-1/3 w-screen m-auto ${
          open
            ? "translate-y-0 md:translate-x-[0px]"
            : "translate-y-[2000px] md:translate-x-[2000px]"
        } `}
      >
        <div className="flex justify-between">
          <Hamburger
            rounded
            toggled={true}
            onToggle={() => {
              setOpen(false);
            }}
          />
        </div>
        <div className="flex flex-col justify-start w-full p-1 m-auto">
          <PurchaseOptions isHorizontal={true} compact={true} />
          <RiskApealCards isHorizontal={false} />
        </div>
      </div>
    </div>
  );
};
