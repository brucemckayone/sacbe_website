"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase/firebase";
import ConfettiExplosion from "react-confetti-explosion";

function CheckoutComplete() {
  const searchParams = useSearchParams();
  const sessionId = searchParams!.get("session_id");

  useEffect(() => {
    logEvent(analytics, "order_completed", {
      checkout_session: sessionId,
    });
  }, []);
  return (
    <div className="w-full m-auto h-screen">
      <div className="w-11/12 md:w-6/12 m-auto">
        <div className="flex justify-between">
          <ConfettiExplosion />
          <ConfettiExplosion />
        </div>
        <Image
          src={"/celebration.gif"}
          width={300}
          height={300}
          unoptimized
          alt="congradulations image for completing the checkout "
          className="object-contain p-10 md:mx-0  w-full h-[300px] m-auto"
        />
        <div className="flex justify-between">
          <ConfettiExplosion />
          <ConfettiExplosion />
        </div>
        <h1 className="text-center mt-1 mb-3 text-3xl">
          You are the best!<br></br> Thank you for your purchase !
        </h1>
        <div className="flex justify-between">
          <ConfettiExplosion />
          <ConfettiExplosion />
        </div>
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

        <div className="">
          <Link
            href={`/bespoke/quiz?session_id=${sessionId}`}
            className="no-underline"
          >
            <div className="rounded-lg border hover:text-onPrimary hover:bg-onPrimaryContainer bg-sacbeBrandColor drop-shadow-md p-2 text-center w-11/12 duration-300 no-underline m-3">
              <p>Start your Journey</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComplete;
