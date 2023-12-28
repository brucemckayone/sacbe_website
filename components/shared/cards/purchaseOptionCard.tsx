"use client";
import createCheckoutSession from "@/lib/stripe/checkout/createCheckoutSession";
import { signIn, useSession } from "next-auth/react";
import PrimaryButton from "../buttons/primaryButton";
import SlideInUp from "../../animations/slide_in_up";
import { useState } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SmallButton from "../buttons/small_button";

interface Props {
  headerText: string;
  listHeaderText: string;
  buttonText: string;
  list?: string[];
  priceString: string;
  bgColor?: string;
  url: string;
  className?: string;
  priceIds: string[];
  paymentMode: "payment" | "subscription";
}

const PurchaseOptionCard: React.FC<Props> = ({
  headerText,
  priceString,
  listHeaderText,
  buttonText,
  list,
  bgColor,
  className,
  priceIds,
  paymentMode,
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div
      key={""}
      className="flex flex-col basis-1/2 justify-between  content-center mx-1 my-5 hover:scale-105 duration-500"
    >
      <SlideInUp animiation="animate-zoom_in_fade">
        <div
          className={`group ${bgColor} ${className} hover:bg-sacbeBrandColor rounded-lg  border-2 shadow-2xl hover:shadow-2xl duration-300 hover:text-[black]`}
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
              isPrimary={true}
              text={isLoading ? "Loading..." : buttonText}
              onClicked={async () => {
                setIsLoading(true);
                try {
                  if (paymentMode == "payment") {
                    await createCheckoutSession({
                      mode: paymentMode,
                      prices: priceIds,
                      qty: 1,
                    });
                    setIsLoading(false);
                  } else {
                    if (session) {
                      open();
                    } else {
                      open();
                    }
                  }
                } catch (e) {
                  console.error("there was an error connecting to stripe");
                  setIsLoading(false);
                }
              }}
            ></PrimaryButton>
          </div>
          <h4 className="text-center text-[white] group-hover:text-[black]">
            {priceString}
          </h4>
        </div>
      </SlideInUp>
      <Modal
        opened={opened}
        onClose={close}
        title="Please elect a shipping option"
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
                qty: 1,
                customerId: "",
              });
              setIsShippingLoading(false);
              setIsLoading(false);
              close();
            }}
            text={isShippingLoading ? "Loading" : "2nd Class ($3.95)"}
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
                mode: "payment",
                customerId: "",
                qty: 1,
              });
              setIsShippingLoading(false);
              setIsLoading(false);
              close();
            }}
            text={isShippingLoading ? "Loading" : "1st Class (£4.95)"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PurchaseOptionCard;
