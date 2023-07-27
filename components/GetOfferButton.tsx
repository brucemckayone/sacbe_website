"use client";
import PrimaryButton from "./buttons/primaryButton";

export function GetOfferButton() {
  return (
    <PrimaryButton
      onClicked={() => {}}
      text="Get Offer"
      isPrimary={false}
      className=" self-center text-center"
    />
  );
}
