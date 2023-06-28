"use client";
import React, { useState } from "react";
import Image from "next/image";
import wholesalePortalMockup from "@/public/wholesale_portal_mock_up.png";
import cacaoInLoveHeart from "@/public/cacao_love_heart.png";
import dynamic from "next/dynamic";

const selectors = [
  {
    title: "Excellent Customer Service",
    description: `We strive to help in anyway we can`,
    image: "/icons/customer_service_icon.svg",
    selected: "customer" as selected,
  },
  {
    title: "Competative Pricing",
    description: `Installments, Buy Now Pay Later, You wont find better Quality or care for any price`,
    image: "/icons/dollar_icon.svg",
    selected: "pricing" as selected,
  },
  {
    title: "Customer Portal",
    description: `Manage your orders in your custom wholesale portal`,
    image: "/icons/customer_portal.svg",
    selected: "portal" as selected,
  },
  {
    title: "Ethical Supply Chain, & Global Good",
    description: ` Our Cacao is fairtrade, supporting ancient tradition, and
                  families in South America`,
    image: "/icons/heart.svg",
    selected: "supply" as selected,
  },
];

export type selected = "customer" | "pricing" | "portal" | "supply";

const RiskApealCards = dynamic(() =>
  import("../RiskApealCards").then((res) => res.RiskApealCards)
);

export function WhyWorkWithUs() {
  const [selected, setSelected] = useState<selected>("pricing");
  return (
    <div className="flex flex-col md:flex-row w-full lg:w-10/12 m-auto">
      <div className="md:w-1/2 flex flex-col justify-center md:mr-10">
        <h2 className="text-4xl">Why Work With Us?</h2>
        <p className="text-sm">
          At Sacbe We Beleieve in nuturing equal partnerships and helping one
          and other grow together
        </p>
        <div className="h-0.5 bg-tertiary w-full"></div>
        <ol>
          {selectors.map((e) => {
            return (
              <li key={e.description}>
                <div
                  className={`${
                    selected == e.selected &&
                    "bg-surface rounded-md m-1 drop-shadow-lg"
                  } flex`}
                  onClick={() => {
                    setSelected(e.selected);
                  }}
                >
                  <Image
                    src={e.image}
                    width={80}
                    height={80}
                    alt="customer service icon"
                    className="p-1 bg-primaryContainer rounded-md m-3"
                  />
                  <div className="flex flex-col justify-center">
                    <h4 className="text-xl font-bold">{e.title}</h4>
                    <p className="text-sm">{e.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="w-full md:w-1/2 bg-surface rounded-xl p-3 drop-shadow-md ">
        <GenerateExtraDetails />
      </div>
    </div>
  );

  function GenerateExtraDetails() {
    switch (selected) {
      case "customer":
        return (
          <div
            className="flex flex-col justify-between h-full"
            key={"customer details"}
          >
            <span>
              <h5>On call to help with your questions</h5>
              <p className="text-sm">
                Sacbe Cacao is committed to providing exceptional customer
                service to our wholesale clients. Our knowledgeable team is
                readily available to assist with your inquiries and requests. We
                prioritize effective communication and prompt responses.
                Building strong relationships with our customers is important to
                us, and we tailor our solutions to meet your specific needs.
                Expect top-quality products from Sacbe Cacao, as we meticulously
                source and craft our cacao offerings. Choose us as your trusted
                wholesale partner and experience our commitment to your
                satisfaction and success.
              </p>
            </span>
            <span>
              <h5>A host of learning material to support your selling</h5>
              <p className="text-sm">
                {" "}
                Unlock your sales potential with our comprehensive learning
                material. Access valuable resources, training modules, and
                insightful guides designed to enhance your product knowledge and
                sales techniques. Equip yourself with the tools to confidently
                engage customers and drive successful sales outcomes.
              </p>
            </span>
            <span>
              <h5>We go the extra mile</h5>
              <p className="text-sm">
                Experience customer service that goes the extra mile, exceeding
                expectations and delivering creative solutions that delight you.
                Choose us for exceptional service that leaves a lasting
                impression.
              </p>
            </span>
          </div>
        );
      case "pricing":
        return (
          <div key={"pricing details"}>
            <h5>Pricing that works with you</h5>
            <p className="text-sm">
              We offer{" "}
              <strong className="text-onPrimaryContainer text-sm">
                installment plans
              </strong>{" "}
              for wholesale customers to spread the cost over{" "}
              <strong className="text-onPrimaryContainer text-sm">
                3 seperate installments
              </strong>
            </p>

            <h5 className="mt-5">
              You wont find better quality for this price
            </h5>
            <p className="text-sm">
              Sacbe Cacao stands out with its cacao of unparalleled quality,
              carefully sourced and crafted to deliver an exceptional flavor
              experience that sets us apart.
            </p>
            <RiskApealCards isHorizontal={false}></RiskApealCards>
          </div>
        );
      case "portal":
        return (
          <div key={"portal details"}>
            <h5 className="mt-5">Your Personal Customer Portal</h5>
            <p className="text-sm">
              Our wholesale customer portal empowers you with seamless access to
              streamlined ordering, real-time inventory updates, and
              personalized account management. Experience convenience and
              efficiency at your fingertips, tailored specifically for your
              wholesale needs.
            </p>
            <div className="flex flex-row justify-center">
              <Image
                src={wholesalePortalMockup}
                width={1080}
                height={800}
                alt={"affiliate portal mock up "}
                className="rounded-lg"
                placeholder="blur"
              ></Image>
            </div>
          </div>
        );

      case "supply":
        return (
          <div
            className=" flex flex-col justify-between"
            key={"supply details"}
          >
            <span>
              <h5>You are supporting communities & ancient tradition</h5>
              <p className="text-sm">
                Our ethical supply chain is the backbone of our operations. We
                are committed to sourcing our products responsibly, ensuring
                fair wages, safe working conditions, and sustainable practices.
                With us, you can trust in the ethical integrity of every step in
                our supply chain.
              </p>
            </span>
            <div className="flex flex-row justify-center">
              <Image
                src={cacaoInLoveHeart}
                width={500}
                height={500}
                alt={"header image"}
                className="object-contain rounded-lg"
                placeholder="blur"
              />
            </div>
          </div>
        );
    }
  }
}
