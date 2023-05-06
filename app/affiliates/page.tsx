import React from "react";

import GetAffiliateLinkButton from "@/components/buttons/getAffiliateLinkButton";

export default async function AffiliatePage() {
  return (
    <div className="flex flex-col h-screen mx-40 ">
      <div className="flex justify-center md:mx-52">
        <span className="flex flex-col md:flex-row text-center whitespace-nowrap ">
          <h1 className="text-6xl lg:text-7xl  ">BECOME A </h1>
          <h1 className="text-sacbeBrandColor text-6xl lg:text-7xl ">
            &nbsp;SACBE&nbsp;
          </h1>
          <h1 className="text-6xl lg:text-7xl">AFFILIATE</h1>
        </span>
      </div>
      <div className="flex flex-col md:flex-row-reverse self-center my-5">
        <div className="flex basis-1/2 my-0 mx-3 mt-20 justify-center">
          <GetAffiliateLinkButton />
        </div>
        <div className="flex flex-col basis-1/2 m-3 justify-center mt-20">
          <div>
            <h5 className="underline">Earn £3 for every sale</h5>
            <h2>About The Program</h2>
            <p>
              Looking for a delicious and healthy way to boost your energy and
              enhance your mood? Look no further than Sacbe Ceremonial Cacao!
              And now, you can not only enjoy the benefits of this amazing
              superfood, but also earn money by becoming an affiliate. For every
              sale you make, you'll earn £3, which can really add up over time.
              Plus, with the popularity of cacao on the rise, there's never been
              a better time to get in on this exciting opportunity. So why wait?
              Sign up now and start earning money while promoting a product you
              can truly believe in!
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
    </div>
  );
}
