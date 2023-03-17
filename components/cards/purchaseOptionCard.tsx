"use client";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import SlideInUp from "../animations/slide_in_up";
import { toast } from "react-toastify";
import Link from "next/link";
import AffiliateProvider from "../auth/affiliate_auth_context";
import { Modal, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAffiliate } from "../auth/affiliate_auth_context";

import { getStripeCustomerIdByEmail } from "@/lib/firebase/getStripeCustomerId";
import getCustomerShipping from "@/lib/stripe/getCustomerShipping";
import TextInput from "../form/inputs/TextInput";
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
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [town, setTown] = useState("");

  const [opened, { open, close }] = useDisclosure(false);

  const notify = () =>
    toast(
      <div>
        <h4>You must log in to purchase a</h4>
        <Link href={"/"}>Learn More</Link>
      </div>
    );
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
                    });
                    setIsLoading(false);
                  } else {
                    if (session) {
                      console.log("session subscroption");

                      const customerid = await getStripeCustomerIdByEmail(
                        session.user?.email
                      );
                      console.log(customerid);

                      const shipping = await getCustomerShipping({
                        id: customerid,
                      });
                      console.log(shipping);
                      if (shipping) {
                        console.log("has shipping");

                        await createCheckoutSession({
                          mode: paymentMode,
                          prices: priceIds,
                        });
                      } else {
                        console.log("no shipping");

                        open();
                      }
                      setIsLoading(false);
                    } else {
                      console.log("not signed in for subscription");
                      notify();
                      setIsLoading(false);
                      window.location.href = "/api/auth/signin";
                    }
                  }
                } catch (e) {
                  console.log("there was an error connecting to stripe");
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
        title="Enter Your shipping details"
      >
        <form action="" method="post">
          <TextInput
            update={setLine1}
            value={line1}
            placeHolder={"Address Line 1"}
            key={"key one"}
          />
          <TextInput
            update={setLine2}
            value={line2}
            placeHolder={"Address Line 2"}
            key={"key one"}
          />
          <TextInput
            update={setPostCode}
            value={postCode}
            placeHolder={"Post Code"}
            key={"key one"}
          />
          <TextInput
            update={setTown}
            value={town}
            placeHolder={"Town/City"}
            key={"key one"}
          />
        </form>
        <div className="flex flex-row md:flex-row justify-between">
          <div className="">
            <PrimaryButton
              onClicked={() => {
                close();
              }}
              isPrimary={false}
              text="Cancel"
              key={"cancel to subscription button"}
            ></PrimaryButton>
          </div>
          <div className="">
            <PrimaryButton
              onClicked={() => {
                //TODO post customer address to customer then send to checkout with
              }}
              isPrimary={true}
              text="Contine"
              key={"continue to subscription button"}
            ></PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PurchaseOptionCard;
