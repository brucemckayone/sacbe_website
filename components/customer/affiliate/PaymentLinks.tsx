"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/components/shared/auth/UserProvider";
import PrimaryButton from "@/components/shared/buttons/primaryButton";
import CardLoader from "@/components/shared/loaders/CardLoader";
import {
  LinkElement,
  PaymentLinkListType,
} from "@/types/affiliatePaymentLinkType";
import toast from "react-hot-toast";
import api from "@/lib/apiSchema/apiSchema";
import { getSubAndOneTimeId } from "@/lib/constants/stripe/productids";

import RegenerateLinksButton from "./RegenerateLinkButton";
import Links from "./Links";

enum PaymentLinksState {
  loading,
  has,
  needs,
  error,
}

export default function PaymentLinks() {
  const [paymentLinksState, setLinksState] = useState<PaymentLinksState>(
    PaymentLinksState.loading
  );
  const { user: affiliate, isLoading: affiliateLoading } = useUser();
  const [isGeneratingLinks, setIsGeneratingLinks] = useState(false);
  const [hasSendLinkRequest, setHasSentLinkRequest] = useState(false);
  const [hasGeneratedPaymentLinks, setHasGeneratedPaymentLinks] =
    useState(false);
  const [linksState, setLinks] = useState<LinkElement[]>();

  let fetchedLinks: PaymentLinkListType | undefined;

  const handleState = async () => {
    try {
      if (isGeneratingLinks) {
        setLinksState(PaymentLinksState.loading);

        const generatedLinks = await api.affiliate.setup.paymentLinks.post({
          data: {
            accountId: affiliate.accountId,
            priceIds: getSubAndOneTimeId(),
            uuid: affiliate.uuid,
          },
        });

        if (generatedLinks.ok) {
          toast.success("Payment Links Generated");
          setLinks(generatedLinks.body.links);
          setIsGeneratingLinks(false);
          setLinksState(PaymentLinksState.has);
        } else {
          toast.error("There was an error generating payment Links");
          setLinksState(PaymentLinksState.needs);
        }

        return;
      }

      const links = await api.affiliate.setup.paymentLinks.get({
        data: { uuid: affiliate.uuid },
      });

      if (links?.ok) {
        setLinksState(PaymentLinksState.has);
        setLinks(links.data.links);
      } else {
        setLinksState(PaymentLinksState.needs);
        setLinks(undefined);
      }
    } catch (e) {
      setLinksState(PaymentLinksState.needs);
    }
  };

  useEffect(() => {
    handleState();
  }, [
    affiliateLoading,
    affiliate.uuid,
    isGeneratingLinks,
    hasSendLinkRequest,
    hasGeneratedPaymentLinks,
  ]);
  switch (paymentLinksState) {
    case PaymentLinksState.loading: {
      return (
        <div className="flex flex-row justify-center w-full">
          <CardLoader vertial />
          <CardLoader vertial />
        </div>
      );
    }
    case PaymentLinksState.has: {
      return (
        <div className="m-auto">
          <RegenerateLinksButton
            affiliate={affiliate}
            setIsGeneratingLinks={setIsGeneratingLinks}
            setHasSentLinkRequest={setHasSentLinkRequest}
            setHasGeneratedPaymentLinks={setHasGeneratedPaymentLinks}
            setLinks={setLinks}
          />
          <Links links={linksState} coupon={affiliate.coupon} />
        </div>
      );
    }
    case PaymentLinksState.needs: {
      return (
        <div className="text-center">
          <PrimaryButton
            text="Generate Affiliate Links"
            onClicked={async () => {
              setIsGeneratingLinks(true);
            }}
          />
        </div>
      );
    }
    case PaymentLinksState.error:
      return <>error</>;
    default:
      return <></>;
  }
}
