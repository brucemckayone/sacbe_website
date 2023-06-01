"use client";

import PrimaryButton from "@/components/buttons/primaryButton";
import SmallButton from "@/components/buttons/small_button";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";

import Hamburger from "hamburger-react";
import Image from "next/image";
import { useState } from "react";
export function QuickPurchase() {
  const [open, setOpen] = useState(false);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [isLoadingOn, setIsLoadingOne] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-5 right-5 bg-sacbeBrandColor rounded-full drop-shadow-2xl animate-float"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Image
          src={"icons/shopping_bag_icon.svg"}
          width={70}
          height={70}
          alt="Shopping bag Icon"
        />
      </button>

      {true && (
        <div
          className={`shadow-lg border-t-2 border-r-2 duration-700 border-l-2 rounded-md p-5 h-[90vh] md:h-2/5 fixed bottom-0 z-100 bg-surface w-screen m-auto ${
            open ? "translate-y-0" : "translate-y-[2000px]"
          } `}
        >
          <div className="flex justify-end">
            <Hamburger
              rounded
              toggled={true}
              onToggle={() => {
                setOpen(false);
              }}
            ></Hamburger>
          </div>
          <div className="flex flex-col md:flex-row justify-around overflow-y-scroll ">
            <div className="bg-[black] text-onPrimary rounded-lg drop-shadow-lg border-2 border-[black] my-5 ">
              <h3 className="text-center py-1">Subscribe</h3>
              <div className="flex bg-surface p-2">
                <Image
                  src={"/sacbe_shapes_background.png"}
                  alt={"Sacbe Cacao Image"}
                  height={100}
                  width={100}
                  className="object-contain"
                />

                <div className="ml-5">
                  <ol className="list-disc ml-5">
                    <li>300g Cacao</li>
                    <li>App & Guided Meditations</li>
                    <li>Exclusive Offers </li>
                    <li>Growing Community Of Like Minded People</li>
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
                              "price_1MpwvjG859ZdyFmp3xDUTY6Z",
                              "price_1MqhygG859ZdyFmpZYxxL1aN",
                            ],
                            mode: "subscription",
                            customerId: "",
                          });
                          setIsLoadingSub(false);
                        }}
                        text="Subscribe"
                        className="text-onPrimaryContainer border-onPrimaryContainer"
                      />
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-center py-1">£33.00</h3>
            </div>
            <div className="bg-[black] text-onPrimary rounded-lg drop-shadow-lg border-2 border-[black] my-5">
              <h3 className="text-center py-1">One-Off-Purchase</h3>
              <div className="flex bg-surface p-2">
                <Image
                  src={"/sacbe_logo_icon.png"}
                  alt={"Sacbe Cacao Image"}
                  height={100}
                  width={100}
                  className="object-contain"
                />

                <div className="ml-5">
                  <ol className="list-disc ml-5">
                    <li>300g Cacao</li>
                    <li>Growing Community Of Like Minded People</li>
                    <li>Free Monthly Event</li>
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
              <h3 className="text-center py-1">£33.00</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
