"use client";
import SmallButton from "@/components/buttons/small_button";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import Image from "next/image";
import { useState } from "react";

type props = {
  isHorizontal: boolean;
  compact: boolean;
} & typeof defaultProps;
const defaultProps = {
  isHorizontal: false,
  compact: false,
};

export function PurchaseOptions(props: props) {
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [isLoadingOn, setIsLoadingOne] = useState(false);
  return (
    <div
      className={`flex ${
        props.isHorizontal ? "md:flex-row flex-col" : "flex-col"
      } justify-around overflow-y-scroll  md:mx-0`}
    >
      <div className=" md:h-[300px] flex flex-col justify-between text-onPrimary rounded-lg  border-2 border-[black] mt-2 md:mr-2 ">
        <h3 className="bg-[black] text-2xl text-center py-1 md:h-[50px]">
          One-Off-Purchase
        </h3>
        <div className="flex h-full align-middle bg-surface p-2">
          {!props.compact && (
            <Image
              src={"/sacbe_logo_icon.png"}
              alt={"Sacbe Cacao Image"}
              height={100}
              width={100}
              className="object-contain w-2/12"
            />
          )}

          <div className="flex-col justify-center ">
            <h5 className="text-onPrimaryContainer">Included</h5>
            <div className="ml-5 ">
              <ol
                className={`list-disc ml-5 ${
                  props.compact ? "md:text-lg" : "md:text-2xl"
                }`}
              >
                <li>300g Organic Cacao Buttons</li>
                <li>Join A Beautiful Community</li>
                <li>Recipes & Articles</li>
              </ol>
              {isLoadingOn ? (
                <ButtonLoader />
              ) : (
                <div className="ml-5">
                  <SmallButton
                    onClicked={async () => {
                      setIsLoadingOne(true);
                      await createCheckoutSession({
                        prices: [
                          "price_1MpxuKG859ZdyFmpoIIVYaVt",
                          "price_1MqhygG859ZdyFmpZYxxL1aN",
                        ],
                        mode: "subscription",
                        customerId: "",
                      });
                      setIsLoadingOne(false);
                    }}
                    text="Buy"
                    className="text-onPrimaryContainer border-onPrimaryContainer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-[black] h-[50px]">
          <h3 className="text-center py-1">£33.00</h3>
        </div>
      </div>
      <div className=" md:h-[300px] flex flex-col justify-between text-onPrimary rounded-lg  border-2 border-[black] mt-2">
        <h3 className="bg-[black] text-2xl text-center py-1 md:h-[50px]">
          SUBSCRIPTION
        </h3>
        <div className="flex h-full align-middle bg-surface p-2">
          {!props.compact && (
            <Image
              src={"/sacbe_shapes_background.png"}
              alt={"Sacbe Cacao Image"}
              height={100}
              width={100}
              className="object-contain w-2/12"
            />
          )}
          <div className="flex-col justify-center ">
            <h5 className="text-onPrimaryContainer">Included</h5>
            <div className="ml-5 ">
              <ol
                className={`list-disc ml-5 ${
                  props.compact ? "md:text-lg" : "md:text-2xl"
                }`}
              >
                <li>60% For The Third Eye App</li>
                <li>Free Monthly Event</li>
                <li>Exclusive Offers</li>
              </ol>
              {isLoadingSub ? (
                <ButtonLoader />
              ) : (
                <div className="ml-5">
                  <SmallButton
                    onClicked={async () => {
                      setIsLoadingSub(true);
                      await createCheckoutSession({
                        prices: [
                          "price_1MpxuKG859ZdyFmpoIIVYaVt",
                          "price_1MqhygG859ZdyFmpZYxxL1aN",
                        ],
                        mode: "subscription",
                        customerId: "",
                      });
                      setIsLoadingSub(false);
                    }}
                    text="SUBSCRIBE"
                    className="text-onPrimaryContainer border-onPrimaryContainer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-[black] h-[50px]">
          <h3 className="text-center py-1">£28.00/month</h3>
        </div>
      </div>
    </div>
  );
}
