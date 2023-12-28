"use client";
import React from "react";
import { LinkElement } from "@/types/affiliatePaymentLinkType";
import LinkCards from "./LinkCards";

export default function Links(props: {
  links?: LinkElement[];
  coupon?: string;
}) {
  if (props.links && props.coupon)
    return (
      <div className="md:ml-5">
        <LinkCards links={props.links} coupon={props.coupon} />
        <p className="text-xs md:text-lg">
          These links will take your customer right to the checkout. They work
          great in a link tree, or in your bio on social media. These are
          designed to share with customers who already want to buy!.
        </p>
      </div>
    );
  else return <></>;
}
