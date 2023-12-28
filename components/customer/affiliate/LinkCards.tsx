"use client";
import React from "react";
import Image from "next/image";
import { RxClipboardCopy } from "react-icons/rx";
import { LinkElement } from "@/types/affiliatePaymentLinkType";
import toast from "react-hot-toast";

export default function LinkCards(props: {
  links: LinkElement[];
  coupon: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-x-10 gap-y-2 my-2 items-center align-middle self-center">
      {props.links!.map((link: any) => {
        return (
          <div
            key={link.link.url}
            className="flex flex-row rounded-lg p-1 items-center shadow-lg bg-tertiaryContainer/70 border justify-center"
          >
            <div className="flex-col flex ">
              <div className="flex flex-row">
                <div className="  m-1 md:mr-1">
                  <Image
                    src={link.product.images[0]}
                    height={100}
                    width={100}
                    alt="product Image"
                    className="h-32 w-32 mr-4 object-cover border rounded-lg shadow"
                  />
                </div>
                <div>
                  <div className="basis-6/12">
                    <div className="flex flex-row justify-between ">
                      <h4>{link.price.type.replaceAll("_", " ")}</h4>
                      <div
                        className="rounded-lg p-1 hover:bg-recommendedGreen bg-onPrimary duration-300 border "
                        onClick={() => {
                          navigator.clipboard.writeText(
                            link.link.url +
                              "?prefilled_promo_code=" +
                              props.coupon
                          );
                          toast.success("Link Copied");
                        }}
                      >
                        <div className="flex flex-row justify-center">
                          <RxClipboardCopy className=" h-7 mr-5" />
                          <p>Copy Link</p>
                        </div>
                      </div>
                    </div>
                    <p>£{link.price.unit_amount / 100} + Shipping</p>
                    <p className="text-sm">{link.product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
