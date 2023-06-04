"use client";

import PrimaryButton from "@/components/buttons/primaryButton";

import Hamburger from "hamburger-react";
import Image from "next/image";
import { useState } from "react";
import { PurchaseOptions } from "./PurchaseOptions";
import { RiskApealCards } from "./RiskApealCards";

export function QuickPurchase() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-5 right-5 bg-sacbeBrandColor rounded-full drop-shadow-2xl animate-float "
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
          className={`shadow-lg border-t-2 border-r-2 duration-700 border-l-2 rounded-md p-5 h-[80vh] overflow-scroll z-10 md:h-3/5 fixed bottom-0 z-100 bg-surface w-screen m-auto ${
            open ? "translate-y-0" : "translate-y-[2000px]"
          } `}
        >
          <div className="flex justify-between">
            <h5>Select A Purchase Option</h5>
            <Hamburger
              rounded
              toggled={true}
              onToggle={() => {
                setOpen(false);
              }}
            ></Hamburger>
          </div>
          <PurchaseOptions isHorizontal={true} />
          <RiskApealCards isHorizontal={true}></RiskApealCards>
        </div>
      )}
    </div>
  );
}
