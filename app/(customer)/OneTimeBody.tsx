"use client";
import { SmallButtonLoader } from "@/components/loaders/ButtonLoader";
import Image from "next/image";
import {
  handleOneOfPurchase,
  RiskAppealLogos,
  RiskFreeEarthHealingPayments,
} from "./PurchaseOptions";
import SmallButton from "@/components/buttons/small_button";
import SlideInUp from "@/components/animations/slide_in_up";
import sacbeFloatingShapesImage from "@/public/sacbe_product_with_shapes.webp";

export function OneTimeBody(props: any) {
  return (
    <div className="flex flex-row basis-full w-full p-2 ">
      <SlideInUp animiation="animate-zoom_in_fade">
        <div className="flex flex-col justify-around md:ml-3">
          <div className="flex flex-row justify-center w-full   ">
            <div className="w-2/3 md:w-1/2 ">
              <h5 className="text-lg text-onPrimaryContainer">Included</h5>
              <ol className={`list-disc ml-5 mb-3 text-sm`}>
                <li>300g Organic Cacao Buttons</li>
                <li>Join A Beautiful Community</li>
                <li>Recipes & Articles</li>
              </ol>
              {props.isLoadingSub ? (
                <SmallButtonLoader />
              ) : (
                <div className="flex">
                  <SmallButton
                    onClicked={handleOneOfPurchase(
                      props.oneofflink,
                      props.router,
                      props.setIsLoadingOne,
                      props.user,
                      props.oneoffQty
                    )}
                    text="PURCHASE"
                    className="text-onPrimaryContainer border-onPrimaryContainer"
                  />
                  <div className="flex  text-[black] mx-2 h-10 items-center rounded-full p-2 bg-surface self-center border ">
                    <button
                      onClick={() => {
                        if (props.oneoffQty > 1) {
                          props.setOneoffQty(props.oneoffQty - 1);
                        }
                      }}
                      className="p-1 rounded-full bg-surface mx-1"
                    >
                      -
                    </button>
                    <p className="mx-1 self-center">{props.oneoffQty}</p>
                    <button
                      onClick={() => {
                        props.oneoffQty < 10 &&
                          props.setOneoffQty(props.oneoffQty + 1);
                      }}
                      className="p-1 rounded-full bg-surface mx-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Image
              src={sacbeFloatingShapesImage}
              alt={"Sacbe Cacao Image"}
              height={250}
              width={200}
              className={`object-contain w-4/12 self-start align-top md:block m-auto`}
            />
          </div>

          <RiskFreeEarthHealingPayments canBuyNow={true} />
        </div>
      </SlideInUp>
    </div>
  );
}
