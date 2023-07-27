"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import SmallButton from "@/components/buttons/small_button";
import { SmallButtonLoader } from "@/components/loaders/ButtonLoader";
import { SearchContext } from "@/components/providers/AffiliatePaymentLinkProvider";
import { analytics } from "@/lib/firebase/firebase";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { logEvent } from "firebase/analytics";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import sacbeFloatingShapesImage from "@/public/sacbe_product_with_shapes.webp";
import dynamic from "next/dynamic";
import {
  buyOneTimeCacao,
  buySubscriptionSecondClass,
  buySubscriptionFirstClass,
} from "../../utils/buyOneTimeCacao";
import PrimaryButton from "@/components/buttons/primaryButton";
import {
  AfterPayLogo,
  ClimateStripeLogo,
  FairTradeLogo,
  KlarnaLogo,
} from "./RiskApealCards";

type props = {
  isHorizontal: boolean;
  compact: boolean;
} & typeof defaultProps;
const defaultProps = {
  isHorizontal: false,
  compact: false,
};

function PurchaseTypeTabs(props: any) {
  return (
    <div className="basis-[70px] flex flex-row justify-between text-surface bg-onSecondaryContainer rounded-t-lg">
      <button
        onClick={() => {
          props.setIsOnOff(true);
        }}
        className={`basis-1/2 text-center  h-[70px] rounded-tl-lg duration-300 ${
          !props.isOnOff
            ? "bg-surface border-2 text-onSecondaryContainer border-onSecondaryContainer"
            : "bg-onSecondaryContainer hover:bg-onTertiaryContainerdrop-shadow-lg tracking-widest"
        }`}
      >
        <h5>ONE-TIME</h5>
      </button>

      <button
        onClick={() => {
          props.setIsOnOff(false);
        }}
        className={`relative basis-1/2 text-center  h-[70px] rounded-tr-lg duration-300 ${
          props.isOnOff
            ? "bg-surface border-2 text-onSecondaryContainer border-onSecondaryContainer"
            : "bg-onSecondaryContainer hover:bg-onTertiaryContainer drop-shadow-lg tracking-widest "
        }`}
      >
        <h5>SUBSCRIBE</h5>
        <div
          className={`absolute text-recommendedGreen  right-0 top-0 px-0.5 py-0.5  md:px-2 md:py-1  drop-shadow-lg rounded-tr-md rounded-bl-md  ${
            props.isOnOff ? "bg-onPrimaryContainer" : "bg-recommendedGreen/30"
          }`}
        >
          <p className="text-xs">21% Off</p>
        </div>
      </button>
    </div>
  );
}

function OneTimeBody(props: any) {
  return (
    <div className="flex flex-row basis-full md:basis-1/2 justify-center">
      <div className="ml-2 my-2">
        <h5 className=" md:text-2xl text-onPrimaryContainer">Included</h5>
        <ol className={`list-disc ml-5 md:text-lg`}>
          <li>300g Organic Cacao Buttons</li>
          <li>Join A Beautiful Community</li>
          <li>Recipes & Articles</li>
        </ol>
        {props.isLoadingSub ? (
          <SmallButtonLoader />
        ) : (
          <div className="flex">
            <PrimaryButton
              onClicked={handleOneOfPurchase(
                props.oneofflink,
                props.router,
                props.setIsLoadingOne,
                props.user,
                props.oneoffQty
              )}
              text="PURCHASE"
              className="text-onPrimaryContainer border-onPrimaryContainer"
            />
            <div className="flex  text-[black] mx-2 h-10 items-center rounded-full p-2 bg-surface self-center border ">
              <button
                onClick={() => {
                  if (props.oneoffQty > 1) {
                    props.setOneoffQty(props.oneoffQty - 1);
                  }
                }}
                className="p-1 rounded-full  bg-surface mx-1"
              >
                -
              </button>
              <p className="mx-1 self-center">{props.oneoffQty}</p>
              <button
                onClick={() => {
                  props.oneoffQty < 10 &&
                    props.setOneoffQty(props.oneoffQty + 1);
                }}
                className="p-1 rounded-full bg-surface mx-1"
              >
                +
              </button>
            </div>
          </div>
        )}
        <RiskFreeEarthHealingPayments />
      </div>
    </div>
  );
}

function RiskFreeEarthHealingPayments() {
  return (
    <>
      <h6 className="text-xs font-extrabold whitespace-nowrap">
        Risk Free, Earth Healing, Fair Trade Payments
      </h6>
      <p className="text-xs text-onPrimaryContainer pr-5 ">
        Support
        <strong className="text-xs "> Fair Trade</strong>, and{" "}
        <strong className="text-xs">remove carbon from the atmosphere</strong>{" "}
        Buy now Pay Later, or in 3-4 installments as low as £8.25.{" "}
        <strong className="text-xs ">100% Money back garentee</strong>{" "}
      </p>
    </>
  );
}

const SubscriptionBody = (props: any) => {
  return (
    <>
      <div className="flex flex-row basis-full md:basis-1/2 justify-center">
        <div className="ml-2 my-2">
          <h5 className=" md:text-2xl text-onPrimaryContainer">Included</h5>
          <ol className={`list-disc ml-5 md:text-lg`}>
            <li>60% For The Third Eye App</li>
            <li>Free Monthly Event</li>
            <li>Save 21% every month</li>
          </ol>

          {props.isLoadingSub ? (
            <SmallButtonLoader />
          ) : (
            <div className="flex">
              <PrimaryButton
                onClicked={async () => {
                  if (props.sublink) {
                    return props.router.push(props.sublink);
                  }
                  props.open();
                }}
                text="Subscribe"
                className="text-onPrimaryContainer border-onPrimaryContainer"
              />
              <div className="flex z-10 text-[black] mx-2 h-10 items-center rounded-full p-2 bg-surface self-center border ">
                <button
                  onClick={() => {
                    if (props.subQty > 1) {
                      props.setSubQty(props.subQty - 1);
                    }
                  }}
                  className="p-1 rounded-full  bg-surface mx-1"
                >
                  -
                </button>
                <p className="mx-1 self-center">{props.subQty}</p>
                <button
                  onClick={() => {
                    props.setSubQty(props.subQty + 1);
                  }}
                  className="p-1 rounded-full bg-surface mx-1"
                >
                  +
                </button>
              </div>
            </div>
          )}
          <RiskFreeEarthHealingPayments />
        </div>
      </div>

      <Modal
        opened={props.opened}
        onClose={props.close}
        title="Please Select a shipping option"
      >
        {!props.session?.user && (
          <div>
            <p>
              We recommend you sign in. So that you can manage your subscription
              more easily
            </p>
            <SmallButton text="Sign In" onClicked={() => signIn()} />
            <p>Subsciptions are shipped out on the 1st of every month</p>
          </div>
        )}
        <div className="flex flex-row justify-around">
          <SmallButton
            isPrimary={false}
            onClicked={async () => {
              props.setIsShippingLoading(true);
              await buySubscriptionSecondClass(props.user, props.subQty);
              logEvent(analytics, "subscription-checkout-started", {
                quantity: props.oneoffQty,
              });
              props.setIsShippingLoading(false);
              props.close();
            }}
            text={props.isShippingLoading ? "Loading" : "2nd Class (£3.95)"}
          />
          <SmallButton
            isPrimary={true}
            onClicked={async () => {
              props.setIsShippingLoading(true);
              await buySubscriptionFirstClass(props.user, props.subQty);
              logEvent(analytics, "subscription-checkout-started", {
                quantity: props.oneoffQty,
              });
              props.setIsShippingLoading(false);
              props.close();
            }}
            text={props.isShippingLoading ? "Loading" : "1st Class (£4.95)"}
          />
        </div>
      </Modal>
    </>
  );
};

export default function PurchaseOptions(props: props) {
  const { data: session } = useSession();
  const { user } = useUser();

  const [isOnOff, setIsOnOff] = useState(true);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [isLoadingOn, setIsLoadingOne] = useState(false);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { oneofflink, sublink } = useContext(SearchContext);

  const [oneoffQty, setOneoffQty] = useState(1);
  const [subQty, setSubQty] = useState(1);

  const SmallButtonLoader = dynamic(() =>
    import("@/components/loaders/ButtonLoader").then(
      (res) => res.SmallButtonLoader
    )
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
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex flex-col  rounded-md">
        <PurchaseTypeTabs isOnOff={isOnOff} setIsOnOff={setIsOnOff} />
        <div className=" flex flex-col  border-x-2 bg-surface w-full ">
          <div className={handleGeneralLayout()}>
            {isOnOff ? (
              <OneTimeBody
                user={user}
                setIsLoadingOne={setIsLoadingOne}
                router={router}
                oneofflink={oneofflink}
                oneoffQty={oneoffQty}
                setOneoffQty={setOneoffQty}
              />
            ) : (
              <SubscriptionBody
                user={user}
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
            )}
            <div className="flex flex-col justify-center  ">
              <Image
                src={sacbeFloatingShapesImage}
                alt={"Sacbe Cacao Image"}
                className={`object-contain h-32 md:h-60 md:w-60 md:block m-auto hidden`}
              />
              <div className="flex flex-row justify-around flex-wrap mb-1 ">
                <KlarnaLogo />
                <AfterPayLogo />
                <ClimateStripeLogo />
                <FairTradeLogo />
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[50px] bg-onSecondaryContainer rounded-b-lg w-full m-auto self-center align-bottom text-surface">
          <h5 className="text-4xl self-center text-center mt-1">{`£${(isOnOff
            ? 35 * oneoffQty
            : 28.0 * subQty
          ).toFixed(2)}/month`}</h5>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="bg-[black] h-[50px]">
  <h3 className="text-center py-1">{`£${(28.0 * subQty).toFixed(2)}/month`}</h3>
</div>; */
}
function handleOneOfPurchase(
  oneofflink: string,
  router: any,
  setIsLoadingOne: any,
  user: userType,
  oneoffQty: number
): Function {
  return async () => {
    if (oneofflink) {
      return router.push(oneofflink);
    }
    setIsLoadingOne(true);
    await buyOneTimeCacao(user, oneoffQty);
    logEvent(analytics, "one-off-purchase-checkout-started", {
      quantity: oneoffQty,
    });
    setIsLoadingOne(false);
  };
}
