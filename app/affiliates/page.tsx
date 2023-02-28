import React from "react";
import { getServerSession } from "next-auth/next";
import AfilliateSales from "@/components/affiliate/affiliate_sales";
import Card from "@/components/cards/card";
import GetAffiliateLinkButton from "@/components/buttons/getAffiliateLinkButton";
export default async function AffiliatePage() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col m-10 h-14 ">
      <div className="flex justify-center">
        <span className="flex flex-col md:flex-row text-center ">
          <h1 className="text-6xl md:text-8xl ">BECOME A </h1>
          <h1 className="text-sacbeBrandColor text-6xl md:text-8xl ">
            &nbsp;SACBE&nbsp;
          </h1>
          <h1 className="text-6xl md:text-8xl">AFFILIATE</h1>
        </span>
      </div>
      <div className="self-center my-5">
        {session && (
          <GetAffiliateLinkButton
            // link="https://buy.stripe.com/test_cN2g271tn0wGdm8cMP"
            isAffilate={true}
          />
        )}
      </div>

      <div className="mt-10 md:mx-96">
        <AfilliateSales></AfilliateSales>
        <div>
          <h5 className="underline">Earn £3 for every sale</h5>
          <h2>About The Program</h2>
          <p>
            Voluptate Lorem irure consectetur veniam quis anim sit cupidatat.
            Laborum ut est qui elit esse commodo non exercitation veniam.
            Consequat nisi amet dolor culpa. Qui fugiat non quis laborum enim
            cupidatat aute. Duis excepteur non cupidatat ea et aliqua anim
            nostrud quis deserunt consequat enim. Ullamco in laborum adipisicing
            irure ullamco consequat aliqua sit et eu veniam qui dolor dolore.
          </p>
        </div>
        <div className=" mt-10">
          <h5 className="underline">Hassle Free Deposits</h5>
          <h2>How do I get paid?</h2>
          <p>
            We provide you with a magic link to a sacbe checkout and when a
            customer makes a purchase we will deposit money into your account
            automaticly.
          </p>
        </div>
      </div>
    </div>
  );
}
