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
import {
  RiskAppealLogos,
  RiskFreeEarthHealingPayments,
} from "./PurchaseOptions";
import SlideInUp from "@/components/animations/slide_in_up";
import sacbeFloatingShapesImage from "@/public/sacbe_product_with_shapes.webp";

export function SubscriptionBody(props: any) {
  return (
    <>
      <div className="flex flex-row basis-full w-full px-1 pt-1">
        <SlideInUp animiation="animate-zoom_in_fade">
          <div className="ml-2 my-1 flex flex-col justify-around">
            <div className="flex flex-row justify-around w-full  ">
              <div className="w-2/3">
                <h5 className=" md:text-lg text-onPrimaryContainer">
                  Included
                </h5>
                <ol className={`list-disc ml-5 md:text-sm`}>
                  <li>60% For The Third Eye App</li>
                  <li>Free Monthly Event</li>
                  <li>Save 21% every month</li>
                </ol>
                {props.isLoadingSub ? (
                  <SmallButtonLoader />
                ) : (
                  <div className="flex">
                    <SmallButton
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
              <RiskAppealLogos />
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
}
