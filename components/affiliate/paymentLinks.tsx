"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "@/components/auth/affiliate_auth_context";
import getAffiliatePaymentLinks from "@/utils/client/stripe/links/getAffiliatePaymentLinks";
import PrimaryButton from "@/components/buttons/primaryButton";
import Image from "next/image";
import { RxClipboardCopy } from "react-icons/rx";
import CardLoader from "@/components/loaders/CardLoader";
import generatePaymentLinks from "@/pages/api/affiliate/generatePaymentLinks";
import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import toast from "react-hot-toast";

import homeUrl from "@/lib/constants/urls";
import dollarIcon from "@/public/icons/dollar_icon.svg";
function PaymentLinks() {
  const { user: affiliate, isLoading: affiliateLoading } = useUser();
  const [isGeneratingLinks, setIsGeneratingLinks] = useState(false);
  const [hasSendLinkRequest, setHasSentLinkRequest] = useState(false);
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

  if (affiliateLoading || isGeneratingLinks) {
    return (
      <div className="flex flex-row justify-around mx-5 md:mx-20">
        <CardLoader />
        <CardLoader />
      </div>
    );
  } else if (fetchedLinks) {
    const links = linksState?.links;
    return (
      <div className=" w-11/12 m-auto">
        <span className="flex justify-end ">
          <button
            className="rounded-lg bg-sacbeBrandColor border drop-shadow-lg px-2 py-1 text-white self-end "
            onClick={async () => {
              try {
                const awnser = window.prompt(
                  'Are you sure you want to regenerate your links? This will invalidate all previous links. Type "yes" to confirm'
                );
                if (awnser == "yes") {
                  setHasGeneratedPaymentLinks(true);
                  setHasSentLinkRequest(true);
                  setIsGeneratingLinks(true);
                  const links = await generatePaymentLinks(
                    affiliate.accountId,
                    affiliate.uuid
                  );
                  setLinks(links);
                  setIsGeneratingLinks(false);
                }
              } catch (e) {
                setHasGeneratedPaymentLinks(false);
              }
            }}
          >
            <p>Regenerate Links</p>
          </button>
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mx-2 my-2">
          {links?.map((link) => {
            return (
              <div
                key={link.link.url}
                className="flex flex-row  rounded-lg  p-1 justify-evenly items-center shadow-lg "
              >
                <Image
                  src={link.product.images[0]}
                  height={100}
                  width={100}
                  alt="product Image"
                />

                <div className="basis-6/12">
                  <h4>{link.price.type.replaceAll("_", " ")}</h4>
                  <p className="text-sm">{link.product.description}</p>
                  <p>£{link.price.unit_amount / 100} + Shipping</p>
                </div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(link.link.url);
                    toast.success("Link Copied");
                  }}
                  className="bg-tertiaryContainer rounded-lg items-center text-center p-2 hover:bg-recommendedGreen duration-300 shadow-md "
                >
                  <RxClipboardCopy className="w-full" />
                  <p className="text-md">copy link</p>
                </div>
              </div>
            );
          })}
        </div>
        <p>
          These links will take your customer right to the checkout. They work
          great in a link tree, or in your bio on social media. These are
          designed to share with customers who already want to buy!.
        </p>
        <h2 className="mt-10">Share Specially Designed Media</h2>

        <div className="mt-10 flex flex-wrap ">
          <div className=" w-11/12 ">
            {/* <h5>Share Our Articles & Recipes with your link</h5> */}
            <span className="inline-flex">
              {" "}
              <p>
                Copy the link to these specially designed target media, or look
                for the
                <Image
                  src={dollarIcon}
                  alt="dollar icon for affiliate links"
                  height={20}
                  width={20}
                  className="bg-sacbeBrandColor w-10 h-10 drop-shadow-lg rounded-full p-2 mx-3 inline-block "
                />{" "}
                at the bottom of any page, recipe or article on our website to
                copy a link with your affiliate link already attached! Its that
                simple!
              </p>
            </span>
          </div>
        </div>
        <div className="flex justify-around flex-row">
          {[1, 2, 3].map((e) => {
            return (
              <div
                className="rounded-lg shadow bg-tertiaryContainer mx-10 w-96 my-10"
                key={e.toString()}
              >
                <Image
                  src={"/fittness.png"}
                  width={200}
                  height={200}
                  alt=""
                  className="w-full rounded-lg h-56 object-cover"
                />
                <div className="p-5">
                  <h3>Fitness & Preformance</h3>
                  <p>
                    A Detailed Break down to share with people that are focused
                    on fitness and personal preformance and how cacao can help{" "}
                  </p>
                  <button
                    className="bg-surface rounded-md border p-2"
                    onClick={() => {
                      const url = homeUrl;
                      navigator.clipboard.writeText(
                        `${url}?sublink=${
                          linksState!.links[0].link.url
                        }&oneofflink=${linksState!.links[1].link.url} `
                      );
                      toast.success(
                        "Link Copied, now share it with the world!"
                      );
                    }}
                  >
                    copy link
                  </button>
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
    !hasGeneratedPaymentLinks &&
    !hasSendLinkRequest
  ) {
    return (
      <div className="text-center">
        <PrimaryButton
          text="Generate Affiliate Link"
          onClicked={async () => {
            try {
              setHasGeneratedPaymentLinks(true);
              setHasSentLinkRequest(true);
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
  return <></>;
}

export default PaymentLinks;
