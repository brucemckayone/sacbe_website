import dynamic from "next/dynamic";
import PurchaseOptions from "../shared/PurchaseOptions";
import { RiskApealCards } from "../shared/RiskApealCards";

export function CallToActionBuyHomePage() {
  return (
    <div className="flex flex-col lg:flex-row w-[95%] md:w-10/12 md:p-10 m-auto p-3 backdrop-blur-lg bg-onPrimary/50 rounded-3xl">
      <TextComponent />
      <PurchaseComponet />
    </div>
  );
}

function PurchaseComponet() {
  return (
    <div className="w-full lg:w-5/12 mt-8 md:mt-0">
      <PurchaseOptions isHorizontal={true} compact={false} />
      <div className="sm:block my-2 m-auto lg:hidden">
        <RiskApealCards isHorizontal={false} />
      </div>
    </div>
  );
}

function TextComponent() {
  return (
    <div className="lg:w-7/12 lg:mr-20 self-center ">
      <h2>
        Awaken Your Senses,
        <br />
        <strong className="text-5xl text-sacbeBrandColor stroke-onPrimaryContainer text-stroke-3 `">
          Embrace the Journey
        </strong>
      </h2>
      <p className="pt-2 ">
        Immerse yourself in the Enchanting world of Sacbe Cacao, where flavor
        and wellness intertwine. Uncover the transformative power of this
        extraordinary beverage and let it ignite your spirit.
        <strong>
          It is time to elevate your daily ritual and savor the magic that Sacbe
          Cacao brings to your life.
        </strong>
      </p>
      <div className="hidden lg:block ">
        <RiskApealCards isHorizontal={false} />
      </div>
    </div>
  );
}
