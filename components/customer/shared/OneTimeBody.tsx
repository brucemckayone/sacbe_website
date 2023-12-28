"use client";
import Image from "next/image";
import {
  handleOneOfPurchase,
  RiskFreeEarthHealingPayments,
} from "./PurchaseOptions";
import SmallButton from "@/components/shared/buttons/small_button";
import sacbeFloatingShapesImage from "@/public/sacbe_product_with_shapes.webp";
import { useAffiliateLinks } from "@/components/providers/AffiliatePaymentLinkProvider";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/shared/auth/UserProvider";
import { userType } from "@/types/typings";
import { Dispatch, SetStateAction } from "react";

function ModifyCountButton(props: {
  modifyCount: (newCount: number) => void;
  count: number;
  modifyAmount: number;
  buttonText: string;
  canModifyCount: boolean;
}) {
  const { count, modifyCount, buttonText, canModifyCount, modifyAmount } =
    props;
  return (
    <button
      onClick={() => {
        if (canModifyCount) modifyCount(count + modifyAmount);
      }}
      className="p-1 rounded-full bg-surface mx-1"
    >
      {buttonText}
    </button>
  );
}

export function UpdateQuantityButtons(props: {
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex  text-[black] mx-2 h-10 items-center rounded-full p-2 bg-surface self-center border ">
      <ModifyCountButton
        count={props.qty}
        modifyCount={props.setQty}
        buttonText={"-"}
        canModifyCount={props.qty > 1}
        modifyAmount={-1}
      />
      <p className="mx-1 self-center">{props.qty}</p>
      <ModifyCountButton
        count={props.qty}
        modifyCount={props.setQty}
        buttonText={"+"}
        canModifyCount={true}
        modifyAmount={1}
      />
    </div>
  );
}

function PurchaseButton(props: {
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  affiliateLink: string;
  text: string;
  purchaseFunction: () => Promise<void>;
}) {
  return (
    <div className="flex">
      <SmallButton
        onClicked={async () => {
          await props.purchaseFunction();
        }}
        text={props.text}
        className="text-onPrimaryContainer border-onPrimaryContainer"
      />
      <UpdateQuantityButtons qty={props.qty} setQty={props.setQty} />
    </div>
  );
}

function IncludesList(props: { includes: string[] }) {
  return (
    <>
      <h5 className="text-lg text-onPrimaryContainer">Included</h5>
      <ul>
        {props.includes.map((e) => {
          return <li key={e}>{e}</li>;
        })}
      </ul>
    </>
  );
}

export function PurchaseOptionBody(props: {
  affiliateLink: string;
  buttonText: string;
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  purchaseFunction: (
    affiliateLink: string,
    qty: number,
    push: (url: string) => void,
    user: userType
  ) => Promise<void>;
}) {
  const { affiliateLink, buttonText, qty, setQty, purchaseFunction } = props;

  const { push } = useRouter();

  const { user } = useUser();
  return (
    <div className="flex flex-row justify-center w-full   ">
      <div className="w-2/3 md:w-1/2 ">
        <IncludesList
          includes={[
            "300g Organic Cacao Buttons",
            "Join A Beautiful Community",
            "Recipes & Articles",
          ]}
        />
        <PurchaseButton
          affiliateLink={affiliateLink}
          qty={qty}
          setQty={setQty}
          text={buttonText}
          purchaseFunction={async () =>
            await purchaseFunction(props.affiliateLink, props.qty, push, user)
          }
        />
      </div>

      <Image
        src={sacbeFloatingShapesImage}
        alt={"Sacbe Cacao Image"}
        height={250}
        width={200}
        className={`object-contain w-4/12 self-start align-top md:block m-auto`}
      />
    </div>
  );
}

export function OneTimeBody(props: any) {
  const { oneofflink } = useAffiliateLinks();
  return (
    <div className="flex flex-row basis-full w-full p-2 ">
      <div className="flex flex-col justify-around md:ml-3">
        <PurchaseOptionBody
          affiliateLink={oneofflink}
          qty={props.oneoffQty}
          setQty={props.setOneoffQty}
          buttonText="Purchase"
          purchaseFunction={handleOneOfPurchase}
        />
        <RiskFreeEarthHealingPayments canBuyNow={true} />
      </div>
    </div>
  );
}
