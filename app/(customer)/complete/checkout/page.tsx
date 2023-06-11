"use client";
import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/buttons/primaryButton";

function CheckoutComplete() {
  const nav = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams!.get("session_id");
  return (
    <div className="w-full m-auto">
      <div className="w-11/12 md:w-6/12 m-auto">
        <Image
          src={"/celebration.gif"}
          width={300}
          height={300}
          unoptimized
          alt="congradulations image for completing the checkout "
          className="object-contain p-10 md:mx-0  w-full h-[300px] m-auto"
        />
        <h1 className="text-center mt-1 mb-3 text-3xl">
          You are the best!<br></br> Thank you for your purchase !
        </h1>
        <p className="text-sm text-center mb-10">
          You just did you bit for the planet by removing co2 from the
          atmosphere
        </p>
        <h4>We have a gift for you... 🎁</h4>
        <p>
          We want you to have the best experiance possible, It Truly Matters To
          Us. So we designed a system to help you find out how to get the most
          out of cacao. We dont want to waste your time, we want to help you
          thrive, and we know we can help. The free guides, recipes, and live
          event invitations are a given if you want them, but there might be a
          little something else in it for you too... its a surprise 🥳.
        </p>

        <PrimaryButton
          text={"Start your Journey"}
          onClicked={() => {
            nav.push(`/bespoke/quiz?session_id=${sessionId}`);
          }}
          className="w-full"
        ></PrimaryButton>
      </div>
    </div>
  );
}

export default CheckoutComplete;
