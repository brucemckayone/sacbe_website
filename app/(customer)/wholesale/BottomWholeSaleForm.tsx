import React from "react";
import { WholeSaleForm } from "./WholeSaleForm.1";
import Link from "next/link";

export function BottomWholeSaleForm() {
  return (
    <div className="flex flex-col md:flex-row my-20">
      <div className="basis-1/2">
        <WholeSaleForm />
      </div>
      <div className="basis-1/2 m-10">
        <div className="basis-1/2">
          <h3 className="mt-5">ORDERING:</h3>
          <p>
            To place an order, you must first be approved as a wholesaler. if
            you have been approved. Log in to the portal, use the link that will
            be sent to your email or
            <Link href="/portal"> Click Here </Link>
            When you make it to the portal you will be guided on how to make and
            manage orders.
          </p>
        </div>
        <div className="basis-1/2">
          <h3 className="mt-5">LEAD TIMES:</h3>
          <p>
            Our current lead time to complete wholesale orders is 2 weeks.
            Please keep this in mind when placing your order. However, do let us
            know if you require the cacao quicker and we will do our best to
            accommodate where possible.
          </p>
        </div>
      </div>
    </div>
  );
}
