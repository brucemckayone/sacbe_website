"use client";
import stripe from "@/lib/constants/stripeInstance";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import checkoutSessionCompleteHandler from "@/lib/webhooks/checkout_session_completed";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import PrimaryButton from "../buttons/primaryButton";
interface Props {
  headerText: string;
  listHeaderText: string;
  buttonText: string;
  list?: string[];
  priceString: string;
  bgColor?: string;
  url: string;
  className?: string;
  prices: string[];
}

const PurchaseOptionCard: React.FC<Props> = ({
  headerText,
  priceString,
  listHeaderText,
  buttonText,
  list,
  bgColor,
  url,
  className,
  prices,
}) => {
  const session = useSession();
  return (
    <div
      className={`group ${className} flex flex-col basis-1/2 justify-between rounded-lg border-2 content-center mx-1 my-5 ${bgColor} hover:bg-sacbeBrandColor shadow-lg hover:shadow-2xl duration-300 hover:text-[black]`}
    >
      <h4 className="border-b-2 border-onBackground text-center md:text-lg text-[white] hover:text-[black] group-hover:text-[black]">
        {headerText}
      </h4>
      <div className="px-2 py-2 bg-[white]">
        <h5>{listHeaderText}</h5>
        <ul key={0}>
          {list &&
            list.map((item) => (
              <li key={item} className="mx-5">
                <p key={`${item}p`}>+ {item}</p>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex justify-center border-b-2 px-1 border-onSecondaryContainer bg-[white] ">
        <PrimaryButton
          text={buttonText}
          url={url}
          onClicked={() => {
            createCheckoutSession({
              prices: prices,
              customerEmail: session.data?.user?.email!,
            });
          }}
        ></PrimaryButton>
      </div>
      <h4 className="text-center text-[white] group-hover:text-[black]">
        {priceString}
      </h4>
    </div>
  );
};

export default PurchaseOptionCard;
