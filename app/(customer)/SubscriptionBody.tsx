"use client";
import SmallButton from "@/components/buttons/small_button";
import { SmallButtonLoader } from "@/components/loaders/ButtonLoader";
import { analytics } from "@/lib/firebase/firebase";
import { Modal } from "@mantine/core";
import { logEvent } from "firebase/analytics";
import { signIn } from "next-auth/react";
import {
  buySubscriptionSecondClass,
  buySubscriptionFirstClass,
} from "../../utils/buyOneTimeCacao";
import Image from "next/image";
import { RiskFreeEarthHealingPayments } from "./PurchaseOptions";
import SlideInUp from "@/components/animations/slide_in_up";
import sacbeFloatingShapesImage from "@/public/sacbe_product_with_shapes.webp";

export function SubscriptionBody(props: any) {
  const handleSubClick = async () => {
    if (props.sublink) {
      return props.router.push(props.sublink);
    }
    props.open();
  };

  const handleSecondClassClick = async () => {
    props.setIsShippingLoading(true);
    await buySubscriptionSecondClass(props.user, props.subQty);
    logEvent(analytics, "subscription-checkout-started", {
      quantity: props.oneoffQty,
    });
    props.setIsShippingLoading(false);
    props.close();
  };

  const handleFirstClassClick = async () => {
    props.setIsShippingLoading(true);
    await buySubscriptionFirstClass(props.user, props.subQty);
    logEvent(analytics, "subscription-checkout-started", {
      quantity: props.oneoffQty,
    });
    props.setIsShippingLoading(false);
    props.close();
  };

  const subDecrement = () => {
    if (props.subQty > 1) {
      props.setSubQty(props.subQty - 1);
    }
  };
  const subIncrement = () => {
    props.setSubQty(props.subQty + 1);
  };

  return (
    <>
      <div className="flex flex-row basis-full w-full p-2">
        <SlideInUp animiation="animate-zoom_in_fade">
          <div className="flex flex-col justify-around md:ml-3">
            <div className="flex flex-row justify-center w-full  ">
              <div className="w-2/3 md:w-1/2 ">
                <h5 className=" md:text-lg text-onPrimaryContainer">
                  Included
                </h5>
                <ol className={`list-disc ml-5 mb-3 text-sm`}>
                  <li>Everything include in One-Time Puchase</li>
                  <li>Monthly Online Cacao Circle</li>
                  <li>Save 20% every month</li>
                </ol>
                {props.isLoadingSub ? (
                  <SmallButtonLoader />
                ) : (
                  <div className="flex">
                    <SmallButton
                      onClicked={handleSubClick}
                      text="SUBSCRIBE"
                      className="text-onPrimaryContainer border-onPrimaryContainer"
                    />
                    <div className="flex z-10 text-[black] mx-2 h-10 items-center rounded-full p-2 bg-surface self-center border ">
                      <button
                        onClick={subDecrement}
                        className="p-1 rounded-full bg-surface mx-1"
                      >
                        -
                      </button>
                      <p className="mx-1 self-center">{props.subQty}</p>
                      <button
                        onClick={subIncrement}
                        className="p-1 rounded-full bg-surface mx-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Image
                src={sacbeFloatingShapesImage}
                alt={"Sacbe Cacao Image"}
                height={250}
                width={200}
                className={`object-contain w-4/12 self-start align-top md:block m-auto `}
              />
            </div>
            <div>
              <RiskFreeEarthHealingPayments />
            </div>
          </div>
        </SlideInUp>
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
            <SmallButton text="Sign In" onClicked={signIn} />
          </div>
        )}
        <div className="h-0.5 bg-onSecondaryContainer w-full" />
        <div className=" bg-errorContainer">
          <p className="text-onErrorContainer my-2 border rounded border-onErrorContainer p-3">
            <span className="text-error"> NOTE: </span> Subsciptions are shipped
            out on the 1st of every month
          </p>
        </div>
        <div className="flex flex-row justify-around">
          <SmallButton
            isPrimary={false}
            onClicked={handleSecondClassClick}
            text={props.isShippingLoading ? "Loading" : "2nd Class (£3.95)"}
          />
          <SmallButton
            isPrimary={true}
            onClicked={handleFirstClassClick}
            text={props.isShippingLoading ? "Loading" : "1st Class (£4.95)"}
          />
        </div>
      </Modal>
    </>
  );
}
