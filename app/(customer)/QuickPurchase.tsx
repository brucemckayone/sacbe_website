"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import getAffiliatePaymentLinks from "@/utils/client/stripe/links/getAffiliatePaymentLinks";
import Hamburger from "hamburger-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PurchaseOptions from "./PurchaseOptions";
import dollarIcon from "@/public/icons/dollar_icon.svg";
import shoppingBag from "@/public/icons/shopping_bag_icon.svg";
import dynamic from "next/dynamic";

export const QuickPurchase = () => {
  const [open, setOpen] = useState(false);
  const { user: affiliate, isLoading: affiliateLoading } = useUser();

  const [linksState, setLinksState] = useState<PaymentLinkListType>();

  const RiskApealCards = dynamic(() =>
    import("./RiskApealCards").then((res) => res.RiskApealCards)
  );

  useEffect(() => {
    let isMounted = true;
    if (affiliate.uuid && affiliate.accountId && affiliate.chargesEnabled) {
      getAffiliatePaymentLinks(affiliate.uuid).then((res) => {
        if (isMounted) {
          setLinksState(res);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [affiliate, affiliateLoading]);

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
          className={`fixed bottom-5 right-24 bg-sacbeBrandColor rounded-full drop-shadow-2xl animate-float p-2 animate-zoom_in }`}
          onClick={async () => {
            const url = window.location.href;
            const toast = await (await import("react-hot-toast")).toast;
            toast.success(
              "Your Link Has Been Copied To Your Clipboard! Now Share it with the world! Best of luck we love you <3"
            );
            // copy text to clipboard current url
            navigator.clipboard.writeText(
              `${url}?sublink=${linksState!.links[0].link.url}&oneofflink=${
                linksState!.links[1].link.url
              } `
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

      <div
        className={`shadow-lg border-t-2 border-r-2 duration-700 border-l-2 rounded-md p-1 h-[80vh] overflow-scroll md:h-[90%]  z-50 fixed md:right-0 bottom-0 z-100 bg-surface md:w-1/3 w-screen m-auto ${
          open
            ? "translate-y-0 md:translate-x-[0px]"
            : "translate-y-[2000px] md:translate-x-[2000px]"
        } `}
      >
        <div className="flex justify-between">
          <h5>Select A Purchase Option</h5>
          <Hamburger
            rounded
            toggled={true}
            onToggle={() => {
              setOpen(false);
            }}
          ></Hamburger>
        </div>
        <div className="flex flex-col justify-start w-10/12 m-auto">
          <PurchaseOptions isHorizontal={true} compact={true} />
          <RiskApealCards isHorizontal={false} />
        </div>
      </div>
    </div>
  );
};
