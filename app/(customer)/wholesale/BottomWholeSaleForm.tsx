import React from "react";
import { WholeSaleForm } from "./WholeSaleForm.1";
import Link from "next/link";
import Image from "next/image";
export function BottomWholeSaleForm() {
  return (
    <div className="flex flex-col md:flex-row my-20 m-auto">
      <div className="basis-1/3 md:mr-20">
        <div className="flex flex-row justify-center">
          <Image
            src={"/wholesale_portal_mock_up.png"}
            width={500}
            height={800}
            alt={"affiliate portal mock up "}
            className=""
          ></Image>
        </div>
        <WholeSaleForm />
      </div>
      <div className="basis-2/3 ">
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
