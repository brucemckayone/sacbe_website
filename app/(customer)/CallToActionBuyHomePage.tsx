import { RiskApealCards } from "./RiskApealCards";
import { PurchaseOptions } from "./PurchaseOptions";

export function CallToActionBuyHomePage() {
  return (
    <div className="bg-primaryContainer m-auto pt-20 md:pt-40  ">
      <div className="flex flex-col md:flex-row w-11/12 md:w-9/12 m-auto">
        <div className=" md:w-5/12  md:mx-10 self-center md:mr-20">
          <h2>
            Awaken Your Senses,{" "}
            <strong className="text-5xl text-sacbeBrandColor stroke-onPrimaryContainer text-stroke-3 `">
              Embrace the Journey
            </strong>
          </h2>
          <p className="pl-2 pt-2 md:pr-10">
            Immerse yourself in the Enchanting world of Sacbe Cacao, where
            flavor and wellness intertwine. Uncover the transformative power of
            this extraordinary beverage and let it ignite your spirit.
            <strong>
              It is time to elevate your daily ritual and savor the magic that
              Sacbe Cacao brings to your life.
            </strong>
          </p>
          <div className="hidden md:block mr-10">
            <RiskApealCards isHorizontal={false} />
          </div>
        </div>
        <div className="md:w-5/12 md:mx-10">
          <PurchaseOptions isHorizontal={false} compact={false} />
          <div className="sm:block m-auto md:hidden">
            <RiskApealCards isHorizontal={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
