import Image from "next/image";
import PurchaseOptionCard from "@/components/cards/purchaseOptionCard";

export default function HeaderInformation() {
  return (
    <div className=" basis-5/12 py-5 px-5 md:px-0 lg:w-1/3 animate-slide_in_right_fade">
      <div className="relative w-auto pb-2">
        <h1 className="text-5xl mt-5">DISCOVER YOUR HEART</h1>
        <span className="flex justify-between my-2 text-center w-full m-auto">
          <p className=" text-xs md:text-lg border-r-2 pr-2 md:pr-5">KETO</p>
          <p className=" text-xs md:text-lg border-r-2 pr-2 md:px-5">VEGAN</p>
          <p className=" text-xs md:text-lg border-r-2 pr-2 md:px-5">ORGANIC</p>
          <p className=" text-xs md:text-lg border-r-2 pr-2 md:px-5">
            SUGAR FREE
          </p>
          <p className="text-xs md:text-lg pr-2 md:pr-10">FAIR TRADE</p>
        </span>
      </div>
      <p className="italic text-sm font-bold p-0">
        &quot;This cacao is absolutely delicious and very nourishing! The energy
        behind the cacao production, it&apos;s origins and the reverence for the
        medicine from the indigenous cultures that harvest the beans can be
        deeply felt.&quot;
      </p>
      <ol key={0}>
        <li key={1} className="border-onSecondaryContainer border-b-2 my-2">
          <div className="flex flex-row align-bottom">
            <h5>300g</h5>
            <p className="self-end ml-2">- Organic Cacao</p>
          </div>
        </li>
        <li key={2} className="border-onSecondaryContainer border-b-2 my-2">
          <div className=" flex flex-row align-bottom ">
            <h5>Notes:</h5>
            <p className="ml-2 self-end whitespace-nowrap">
              Plum, Fudge, Caramel, Raison
            </p>
          </div>
        </li>
        <li key={3} className="border-onSecondaryContainer border-b-2 my-2">
          <div className="flex flex-row align-bottom">
            <h5>Feels:</h5>
            <p className="ml-2 self-start text-md ">
              Grounded, Loving, Creative, expansive
            </p>
          </div>
        </li>
        <li key={4} className="border-onSecondaryContainer border-b-2 my-2">
          <div className="flex flex-row align-bottom">
            <h5>Buttons:</h5>
            <p className="self-end ml-2">For easy and intuitive dosing</p>
          </div>
        </li>
      </ol>

      <div className="flex flex-col-reverse md:flex-row justify-between">
        <PurchaseOptionCard
          key={1}
          headerText="One-Off-Purchase"
          list={[
            "300g Sacbe Cacao",
            "App & Guided Meditation",
            "A few good days",
          ]}
          listHeaderText="Included:"
          priceString="£30.00"
          buttonText="Buy"
          url="https://buy.stripe.com/test_3cs8zF8VPcfobe0002"
          bgColor="bg-[black]"
          priceIds={["price_1Mb8slG859ZdyFmp0ttYsJAh"]}
          paymentMode="payment"
        ></PurchaseOptionCard>

        <PurchaseOptionCard
          key={2}
          headerText="SUBSCRIBE"
          buttonText="Subscribe"
          list={["300g Bag", "Free Monthly Event", "Growing Community"]}
          listHeaderText="Included:"
          priceString="£25.00/month"
          url="https://buy.stripe.com/test_cN2g271tn0wGdm8cMP"
          bgColor="bg-[black]"
          priceIds={["price_1MpD0AG859ZdyFmp43Kt9Twz"]}
          paymentMode="subscription"
        ></PurchaseOptionCard>
      </div>
    </div>
  );
}
