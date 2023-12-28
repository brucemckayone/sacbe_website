"use client";
import SmallButton from "@/components/shared/buttons/small_button";

export function CallToActionButton() {
  return (
    <SmallButton
      text={"Discover Our Training"}
      onClicked={() =>
        scrollBy({
          top: 800,
          behavior: "smooth",
        })
      }
      className="border-white text-white"
      isPrimary={false}
    />
  );
}
