"use client";
import React from "react";
import toast from "react-hot-toast";
import { userType } from "@/types/typings";
import api from "@/lib/apiSchema/apiSchema";
import { getSubAndOneTimeId } from "@/lib/constants/stripe/productids";

export default function RegenerateLinksButton(props: any) {
  return (
    <span className="flex justify-end ">
      <button
        className="rounded-md bg-sacbeBrandColor border drop-shadow-lg px-2  text-white self-end "
        onClick={async () => {
          await handleRegeneratingLinks(
            props.setHasGeneratedPaymentLinks,
            props.setHasSentLinkRequest,
            props.setIsGeneratingLinks,
            props.affiliate,
            props.setLinks
          );
        }}
      >
        <p className="text-xs md:text-md">Regenerate Links</p>
      </button>
    </span>
  );
}

async function handleRegeneratingLinks(
  setHasGeneratedPaymentLinks: React.Dispatch<React.SetStateAction<boolean>>,
  setHasSentLinkRequest: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGeneratingLinks: React.Dispatch<React.SetStateAction<boolean>>,
  affiliate: userType,
  setLinks: React.Dispatch<React.SetStateAction<any | undefined>>
) {
  try {
    const awnser = window.prompt(
      'Are you sure you want to regenerate your links? This will invalidate all previous links. Type "yes" to confirm'
    );
    if (awnser == "yes") {
      setHasGeneratedPaymentLinks(true);
      setHasSentLinkRequest(true);
      setIsGeneratingLinks(true);
      await api.affiliate.setup.paymentLinks.delete({
        data: {
          uuid: affiliate.uuid,
        },
      });
      const links = await api.affiliate.setup.paymentLinks.post({
        data: {
          accountId: affiliate.accountId,
          priceIds: getSubAndOneTimeId(),
          uuid: affiliate.uuid,
        },
      });

      console.log(links);

      if (links.ok) {
        toast.success("Links Generated");
        setLinks(links.body.links);
      } else {
        toast.error("There was an error genrating your links");
      }
      setIsGeneratingLinks(false);
    }
  } catch (e) {
    setHasGeneratedPaymentLinks(false);
  }
}
