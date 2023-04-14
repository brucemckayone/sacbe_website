"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useAffiliate } from "@/components/auth/affiliate_auth_context";
import getAffiliatePaymentLinks from "@/utils/client/stripe/links/getAffiliatePaymentLinks";
import PrimaryButton from "@/components/buttons/primaryButton";
import Image from "next/image";
import { RxClipboardCopy } from "react-icons/rx";
import CardLoader from "@/components/loaders/CardLoader";
import generatePaymentLinks from "@/pages/api/affiliate/generatePaymentLinks";
import showToast from "@/lib/toast/showToast";
import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import { link } from "fs";

function PaymentLinks() {
  const { user: affiliate, isLoading: affiliateLoading } = useAffiliate();
  const [isGeneratingLinks, setIsGeneratingLinks] = useState(false);
  const [hasGeneratedPaymentLinks, setHasGeneratedPaymentLinks] =
    useState(false);
  const [linksState, setLinks] = useState<PaymentLinkListType>();

  let {
    isLoading,
    data: fetchedLinks,
    error,
  } = useSWR(affiliate.uuid, getAffiliatePaymentLinks);

  useEffect(() => {
    setLinks(fetchedLinks);
  }, [linksState, fetchedLinks]);

  if (affiliateLoading || isGeneratingLinks || isLoading) {
    return (
      <div className="flex flex-row justify-around mx-5 md:mx-20">
        <CardLoader />
        <CardLoader />
      </div>
    );
  } else if (fetchedLinks) {
    const links = linksState?.links;

    return (
      <div>
        <h4>My Affiliate Links</h4>
        <p>
          Copy these links and use them to sell sacbe. You will recieve payments
          everytime a subscription is renewed!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mx-2 my-2">
          {links?.map((link) => {
            return (
              <div
                key={link.link.url}
                className="flex flex-row  rounded-md  p-1 h-20 justify-evenly items-center shadow-md"
              >
                <div className="relative h-10 w-10">
                  <Image
                    src={link.product.images[0]}
                    height={40}
                    width={40}
                    alt="product Image"
                  ></Image>
                </div>
                <div className="basis-6/12">
                  <h5 className="text-lg">{link.product.name}</h5>
                  <p>£{link.price.unit_amount / 100}</p>
                </div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(link.link.url);
                    showToast({ message: "Copied To Clipboard", link: "" });
                  }}
                  className="bg-tertiaryContainer rounded-lg items-center text-center p-2 hover:bg-recommendedGreen duration-300 shadow-md "
                >
                  <RxClipboardCopy className=" w-full" />
                  <p className="text-xs">copy link</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (
    affiliate.chargesEnabled &&
    !isLoading &&
    !isGeneratingLinks &&
    !affiliateLoading &&
    !hasGeneratedPaymentLinks
  ) {
    return (
      <div className="text-center">
        <PrimaryButton
          text="Generate Affiliate Link"
          onClicked={async () => {
            try {
              setHasGeneratedPaymentLinks(true);
              setIsGeneratingLinks(true);
              const links = await generatePaymentLinks(
                affiliate.accountId,
                affiliate.uuid
              );
              setLinks(links);
              setIsGeneratingLinks(false);
            } catch (e) {
              setHasGeneratedPaymentLinks(false);
            }
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-around mx-5 md:mx-20">
      <CardLoader />
      <CardLoader />
    </div>
  );
}

export default PaymentLinks;
