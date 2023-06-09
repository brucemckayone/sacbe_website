"use client";
import { useUser } from "@/components/auth/affiliate_auth_context";
import SmallButton from "@/components/buttons/small_button";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import { SearchContext } from "@/components/providers/AffiliatePaymentLinkProvider";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";

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
            src={"/sacbe_logo_icon.png"}
            alt={"Sacbe Cacao Image"}
            height={100}
            width={100}
            className="object-contain w-2/12"
          />

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
                      if (oneofflink) {
                        return router.push(oneofflink);
                      }
                      setIsLoadingOne(true);
                      await createCheckoutSession({
                        prices: ["price_1Mb8slG859ZdyFmp0ttYsJAh"],
                        mode: "payment",
                        customerId: user.customerId ?? undefined,
                      });
                      setIsLoadingOne(false);
                    }}
                    text="Buy"
                    className="text-onPrimaryContainer border-onPrimaryContainer"
                  />
                </div>
              )}
              <p className="text-xs text-onPrimaryContainer">
                Buy now pay in 30 days, or in 3-4 installments as low as £8.25
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[black] h-[50px]">
          <h3 className="text-center py-1">£33.00</h3>
        </div>
      </div>
      <div className=" md:h-[320px] flex flex-col justify-around text-onPrimary rounded-lg  border-2 border-[black] mt-2">
        <h3 className="bg-[black] text-2xl text-center py-1 md:h-[50px]">
          SUBSCRIPTION
        </h3>

        <div className="flex flex-row-reverse justify-around   h-full align-middle bg-surface p-2">
          {/* {!props.compact && ( */}
          <Image
            src={"/sacbe_shapes_background.png"}
            alt={"Sacbe Cacao Image"}
            height={100}
            width={100}
            className="object-contain w-2/12"
          />
          {/* )} */}
          <div className="flex-col ">
            <h5 className="text-onPrimaryContainer">Included</h5>
            <div className="ml-5 ">
              <ol
                className={`list-disc ml-5 ${
                  props.compact ? "md:text-lg" : "md:text-2xl"
                }`}
              >
                <li>60% For The Third Eye App</li>
                <li>Free Monthly Event</li>
                <li>Save 21% every month</li>
              </ol>
              {isLoadingSub ? (
                <ButtonLoader />
              ) : (
                <div className="ml-5">
                  <SmallButton
                    onClicked={async () => {
                      if (sublink) {
                        return router.push(sublink);
                      }
                      open();
                    }}
                    text="Subscription"
                    className="text-onPrimaryContainer border-onPrimaryContainer"
                  />
                </div>
              )}
              <p className="text-xs text-onPrimaryContainer">
                Everything included in the one-off purchase, plus more!*
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[black] h-[50px]">
          <h3 className="text-center py-1">£28.00/month</h3>
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
                  "price_1MpwvjG859ZdyFmp3xDUTY6Z",
                  "price_1MqhygG859ZdyFmpZYxxL1aN",
                ],
                mode: "subscription",
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
                  "price_1MpxuKG859ZdyFmpoIIVYaVt",
                  "price_1MqhygG859ZdyFmpZYxxL1aN",
                ],
                mode: "subscription",
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
