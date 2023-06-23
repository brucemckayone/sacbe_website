"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import { a, PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import getAffiliatePaymentLinks from "@/utils/client/stripe/links/getAffiliatePaymentLinks";
import Hamburger from "hamburger-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PurchaseOptions from "./PurchaseOptions";
import { RiskApealCards } from "./RiskApealCards";
import toast, { Toaster } from "react-hot-toast";
import dollarIcon from "@/public/icons/dollar_icon.svg";
import shoppingBag from "@/public/icons/shopping_bag_icon.svg";

export function QuickPurchase() {
  const [open, setOpen] = useState(false);
  const { user: affiliate, isLoading: affiliateLoading } = useUser();
  const notify = () =>
    toast.success(
      "Your Link Has Been Copied To Your Clipboard! Now Share it with the world! Best of luck we love you <3"
    );

  const [linksState, setLinks] = useState<PaymentLinkListType>();

  useEffect(() => {
    if (affiliate.uuid && affiliate.accountId && affiliate.chargesEnabled)
      getAffiliatePaymentLinks(affiliate.uuid).then((res) => {
        return setLinks(res);
      });
    console.log(linksState);
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
          onClick={() => {
            const url = window.location.href;
            notify();

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
        className={`shadow-lg border-t-2 border-r-2 duration-700 border-l-2 rounded-md p-5 h-[80vh] overflow-scroll z-10 md:h-3/5 fixed bottom-0 z-100 bg-surface w-screen m-auto ${
          open ? "translate-y-0" : "translate-y-[2000px]"
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
        <div className="flex flex-col justify-around md:h-full">
          <PurchaseOptions isHorizontal={true} compact={false} />
          <RiskApealCards isHorizontal={true}></RiskApealCards>
        </div>
      </div>
    </div>
  );
}
