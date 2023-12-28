"use client";

import { SearchContext } from "@/components/providers/AffiliatePaymentLinkProvider";
import { analytics } from "@/lib/firebase/firebase";
import { useDisclosure } from "@mantine/hooks";
import { logEvent } from "firebase/analytics";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { buyOneTimeCacao } from "../../../lib/stripe/checkout/buyOneTimeCacao";
import {
  AfterPayLogo,
  ClimateStripeLogo,
  FairTradeLogo,
  KlarnaLogo,
} from "./RiskApealCards";
import { OneTimeBody } from "./OneTimeBody";
import { SubscriptionBody } from "./SubscriptionBody";

import { PurchaseTypeTabs } from "./PurchaseTypeTabs";
import { userType } from "@/types/typings";

type props = {
  isHorizontal: boolean;
  compact: boolean;
} & typeof defaultProps;
const defaultProps = {
  isHorizontal: false,
  compact: false,
};

export default function PurchaseOptions(props: props) {
  const { data: session } = useSession();

  const [isOnOff, setIsOnOff] = useState(false);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [isLoadingOn, setIsLoadingOne] = useState(false);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { oneofflink, sublink } = useContext(SearchContext);
  const [oneoffQty, setOneoffQty] = useState(1);
  const [subQty, setSubQty] = useState(1);

  return (
    <div className="flex flex-col justify-center h-full drop-shadow-md">
      <div className="flex flex-col  rounded-md">
        <PurchaseTypeTabs isOnOff={isOnOff} setIsOnOff={setIsOnOff} />
        <div className="flex flex-col border-x-2 border-black bg-surface w-full">
          <div className={handleGeneralLayout()}>
            {isOnOff ? (
              <OneTimeBody
                setIsLoadingOne={setIsLoadingOne}
                router={router}
                oneofflink={oneofflink}
                oneoffQty={oneoffQty}
                setOneoffQty={setOneoffQty}
                isLoadingOn={isLoadingOn}
              />
            ) : (
              <div className="flex flex-row basis-full w-full p-2 ">
                {/* <div className="flex flex-col justify-around md:ml-3">
                  <PurchaseOptionBody
                    affiliateLink={oneofflink}
                    qty={subQty}
                    setQty={setSubQty}
                    buttonText="SUBSCRIBE"
                    purchaseFunction={handleOneOfPurchase}
                  />
                  <RiskFreeEarthHealingPayments canBuyNow={true} />
                </div> */}
                <SubscriptionBody
                  session={session}
                  setIsLoadingSub={setIsLoadingSub}
                  isLoadingSub={isLoadingSub}
                  router={router}
                  sublink={sublink}
                  subQty={subQty}
                  setSubQty={setSubQty}
                  opened={opened}
                  open={open}
                  close={close}
                  setIsShippingLoading={setIsShippingLoading}
                  isShippingLoadin={isShippingLoading}
                />
              </div>
            )}
          </div>
        </div>
        <div className="basis-[50px] bg-onSecondaryContainer rounded-b-lg w-full m-auto self-center align-bottom text-surface">
          <h5 className="text-4xl self-center text-center mt-1">{`£${
            isOnOff
              ? (35 * oneoffQty).toFixed(2)
              : (28.0 * subQty).toFixed(2) + "/month"
          }`}</h5>
        </div>
      </div>
      <RiskAppealLogos />
    </div>
  );

  function handleGeneralLayout() {
    if (props.compact) {
      return `flex flex-col md:flex-col-reverse justify-around`;
    } else if (props.compact && props.isHorizontal) {
      return `flex md:flex-row flex-col justify-around`;
    } else if (props.isHorizontal) {
      return `flex md:flex-row flex-col justify-around`;
    } else {
      return `flex md:flex-row flex-col justify-around`;
    }
  }
}

export const handleOneOfPurchase = async (
  affiliateLink: string,
  oneoffQty: number,
  push: (url: string) => void,
  user: userType
) => {
  if (affiliateLink) return push(affiliateLink);
  await buyOneTimeCacao(user, oneoffQty);
  logEvent(analytics, "one-off-purchase-checkout-started", {
    quantity: oneoffQty,
  });
};

export function RiskAppealLogos() {
  return (
    <div className="flex flex-row justify-around flex-wrap mt-3 px-3 py-1  drop-shadow-md">
      <KlarnaLogo />
      <AfterPayLogo />
      <ClimateStripeLogo />
      <FairTradeLogo />
    </div>
  );
}

export function RiskFreeEarthHealingPayments(props: any) {
  return (
    <div>
      <h6 className="text-xs font-extrabold whitespace-nowrap">
        Risk Free, Earth Healing, Fair Trade Payments
      </h6>
      <p className="text-xs text-onPrimaryContainer pr-5 ">
        <strong className="text-xs ">100% money back</strong> flexible payments
        that support
        <strong className="text-xs "> Fair Trade</strong> all while{" "}
        <strong className="text-xs">
          removing carbon from the atmosphere.
        </strong>{" "}
        {props.canBuyNow &&
          "Buy now Pay Later, or in 3-4 installments as low as £8.25."}
      </p>
    </div>
  );
}
