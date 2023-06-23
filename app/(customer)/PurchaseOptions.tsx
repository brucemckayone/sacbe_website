"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import SmallButton from "@/components/buttons/small_button";
import { SmallButtonLoader } from "@/components/loaders/ButtonLoader";
import { SearchContext } from "@/components/providers/AffiliatePaymentLinkProvider";
import { analytics } from "@/lib/firebase/firebase";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { logEvent } from "firebase/analytics";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import sacbeIconImage from "@/public/sacbe_logo_icon.png";
import sacbeFloatingShapesImage from "@/public/sacbe_product_with_shapes.webp";

type props = {
  isHorizontal: boolean;
  compact: boolean;
} & typeof defaultProps;
const defaultProps = {
  isHorizontal: false,
  compact: false,
};

export function PurchaseOptions(props: props) {
  const { data: session } = useSession();
  const { user } = useUser();
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [isLoadingOn, setIsLoadingOne] = useState(false);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { oneofflink, sublink } = useContext(SearchContext);

  const [oneoffQty, setOneoffQty] = useState(1);
  const [subQty, setSubQty] = useState(1);

  return (
    <div
      className={`flex ${
        props.isHorizontal ? "md:flex-row flex-col" : "flex-col"
      } justify-around md:mx-0`}
    >
      <div
        className={`md:h-[320px] flex flex-col justify-between text-onPrimary  rounded-lg  border-2 border-[black] mt-2 ${
          props.isHorizontal && "md:mr-2"
        } `}
      >
        <h3 className="bg-[black] text-2xl text-center py-1 md:h-[50px]">
          One-Off-Purchase
        </h3>
        <div className="flex flex-row-reverse justify-around h-full align-middle bg-surface p-2">
          {/* {!props.compact && ( */}
          <Image
            src={sacbeIconImage}
            alt={"Sacbe Cacao Image"}
            className="object-contain w-3/12"
            placeholder="blur"
          />

          <div className="flex-col justify-center ">
            <h5 className="text-onPrimaryContainer">Included</h5>
            <div className="ml-5 ">
              <ol
                className={`list-disc ml-5 ${
                  props.compact ? "md:text-md" : "md:text-2xl"
                }`}
              >
                <li>300g Organic Cacao Buttons</li>
                <li>Join A Beautiful Community</li>
                <li>Recipes & Articles</li>
              </ol>
              {isLoadingOn ? (
                <SmallButtonLoader />
              ) : (
                <div className="ml-5 flex">
                  <SmallButton
                    onClicked={async () => {
                      if (oneofflink) {
                        return router.push(oneofflink);
                      }
                      setIsLoadingOne(true);
                      await createCheckoutSession({
                        prices: ["price_1NLYCcG859ZdyFmpgkHOXIUZ"],
                        mode: "payment",
                        customerId: user.customerId ?? undefined,
                        qty: oneoffQty,
                      });
                      logEvent(analytics, "one-off-purchase-checkout-started", {
                        quantity: oneoffQty,
                      });
                      setIsLoadingOne(false);
                    }}
                    text="Buy"
                    className="text-onPrimaryContainer border-onPrimaryContainer"
                  />
                  <div className="flex  text-[black] mx-2 h-10 items-center rounded-full p-2 bg-surface self-center border ">
                    <button
                      onClick={() => {
                        if (oneoffQty > 1) {
                          setOneoffQty(oneoffQty - 1);
                        }
                      }}
                      className="p-1 rounded-full  bg-surface mx-1"
                    >
                      -
                    </button>
                    <p className="mx-1 self-center">{oneoffQty}</p>
                    <button
                      onClick={() => {
                        oneoffQty < 10 && setOneoffQty(oneoffQty + 1);
                      }}
                      className="p-1 rounded-full bg-surface mx-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              <p className="text-xs text-onPrimaryContainer">
                Buy now pay in 30 days, or in 3-4 installments as low as £8.25
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[black] h-[50px]">
          <h3 className="text-center py-1">{`£${(35.0 * oneoffQty).toFixed(
            2
          )}`}</h3>
        </div>
      </div>
      <div className=" md:h-[320px] flex flex-col justify-around text-onPrimary rounded-lg  border-2 border-[black] mt-2">
        <span className="bg-[black] flex justify-around">
          <div className="w-20"></div>
          <h3 className=" text-2xl text-center py-1 md:h-[40px]">
            SUBSCRIPTION
          </h3>
          <p className="w-30  self-center text-recommendedGreen">save 21%</p>
        </span>

        <div className="flex flex-row-reverse justify-around   h-full align-middle bg-surface p-2">
          {/* {!props.compact && ( */}
          <Image
            src={sacbeFloatingShapesImage}
            alt={"Sacbe Cacao Image"}
            className="object-contain w-3/12"
            placeholder="blur"
          />
          {/* )} */}
          <div className="flex-col ">
            <h5 className="text-onPrimaryContainer">Included</h5>
            <div className="ml-5 ">
              <ol
                className={`list-disc ml-5 ${
                  props.compact ? "md:text-md" : "md:text-2xl"
                }`}
              >
                <li>60% For The Third Eye App</li>
                <li>Free Monthly Event</li>
                <li>Save 21% every month</li>
              </ol>
              {isLoadingSub ? (
                <SmallButtonLoader />
              ) : (
                <div className="ml-5 flex ">
                  <SmallButton
                    onClicked={async () => {
                      if (sublink) {
                        return router.push(sublink);
                      }
                      open();
                    }}
                    text="Subscribe"
                    className="text-onPrimaryContainer border-onPrimaryContainer"
                  />

                  <div className="flex  text-[black] mx-2 h-10 items-center rounded-full p-2 bg-surface self-center border ">
                    <button
                      onClick={() => {
                        if (subQty > 1) {
                          setSubQty(subQty - 1);
                        }
                      }}
                      className="p-1 rounded-full  bg-surface mx-1"
                    >
                      -
                    </button>
                    <p className="mx-1 self-center">{subQty}</p>
                    <button
                      onClick={() => {
                        setSubQty(subQty + 1);
                      }}
                      className="p-1 rounded-full bg-surface mx-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              <p className="text-xs text-onPrimaryContainer">
                Everything included in the one-off purchase, plus more!*
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[black] h-[50px]">
          <h3 className="text-center py-1">{`£${(28.0 * subQty).toFixed(
            2
          )}/month`}</h3>
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Please Select a shipping option"
      >
        {!session?.user && (
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
              setIsShippingLoading(true);
              await createCheckoutSession({
                prices: [
                  "price_1NLYCcG859ZdyFmpa95GIeSb",
                  "price_1NLYCaG859ZdyFmprZcXvCYg",
                ],
                mode: "subscription",
                customerId: user.customerId ?? undefined,
                qty: subQty,
              });
              logEvent(analytics, "subscription-checkout-started", {
                quantity: oneoffQty,
              });
              setIsShippingLoading(false);
              close();
            }}
            text={isShippingLoading ? "Loading" : "2nd Class (£3.95)"}
          />

          <SmallButton
            isPrimary={true}
            onClicked={async () => {
              setIsShippingLoading(true);
              await createCheckoutSession({
                prices: [
                  "price_1NLYCcG859ZdyFmpa95GIeSb",
                  "price_1NLYCTG859ZdyFmpJCrCATal",
                ],
                mode: "subscription",
                customerId: user.customerId ?? undefined,
                qty: subQty,
              });
              logEvent(analytics, "subscription-checkout-started", {
                quantity: oneoffQty,
              });
              setIsShippingLoading(false);
              close();
            }}
            text={isShippingLoading ? "Loading" : "1st Class (£4.95)"}
          />
        </div>
      </Modal>
    </div>
  );
}
