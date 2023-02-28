"use client";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import SlideInUp from "../animations/slide_in_up";
import { toast } from "react-toastify";
import Link from "next/link";
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
      // onClick={async () => {
      //   setIsLoading(true);
      //   try {
      //     await createCheckoutSession({
      //       mode: paymentMode,
      //       prices: priceIds,
      //     });
      //     setIsLoading(false);
      //   } catch (e) {
      //     console.log("there was an error connecting to stripe");
      //     setIsLoading(false);
      //   }
      // }}
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
                  if ((paymentMode != "subscription" && session) || session) {
                    await createCheckoutSession({
                      mode: paymentMode,
                      prices: priceIds,
                    });
                    setIsLoading(false);
                  } else {
                    console.log("not signed in for subscription");

                    notify();
                    setIsLoading(false);
                    window.location.href = "/api/auth/signin";
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
    </div>
  );
};

export default PurchaseOptionCard;
