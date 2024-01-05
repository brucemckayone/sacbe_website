import React from "react";
import Image from "next/image";
import SmallLinkButton from "@/components/shared/buttons/smallLinkButton";

import facilitatorPageMetadata from "./metadata";
import { SocialContactPill } from "./SocialContactPill";

interface IFacilitatorInfo {
  name: string;
  contact?: {
    email?: string;
    whatsapp?: string;
  };
  website?: string;
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  bio: string;
  image: string;
}

const facilitatorInfo: IFacilitatorInfo[] = [
  {
    name: "Susan Findlay",
    website: "https://www.susan-findlay.com",
    social: {
      instagram: "https://www.instagram.com/iamsusanfindlay",
      facebook: "https://www.facebook.com/Susan_Findlay_Life_Coach",
    },
    image: "/facilitators/SUSANFINALS-14.jpg",
    bio: "Susan holds deep sacred and safe space through her various online and in person offerings in East Lothian.  Join her for monthly women's circles, quarterly full day retreats or deep healing and transformation groups.",
  },
  {
    name: "Stephanie Harkin",
    social: {
      facebook: "https://www.facebook.com/profile.php?id=61550747162238",
      instagram:
        "https://www.instagram.com/journeytoheka?igsh=MXhvYXRzNmxibDE4aQ%3D%3D&utm_source=qr",
    },
    image: "/facilitators/steph.jpg", // You did not provide an image for Stephanie Harkin.
    bio: "Stephanie holds cacao with blue lotus ceremonies in Bedfordshire, and monthly online events. She has spent the past 20 years travelling back and forth to Egypt and is currently studying Ancient Egyptian shamanism. She works with the Ancient Egyptian calendar, the deities and Heka (Ancient Egyptian magic). She also facilitates initiation journeys and sacred pilgrimages to Egypt.",
    contact: {
      email: "journeytoheka@outlook.com",
      whatsapp: "+447930676363",
    },
  },
];

export const metadata = facilitatorPageMetadata;

function FacilitatorPage() {
  return (
    <section>
      <h1 className="text-center">Sacbe Facilitators</h1>
      <div className="w-11/12 m-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilitatorInfo.map((facilitator) => {
          return (
            <div
              className="my-5 bg-primaryContainer/20 rounded-xl shadow"
              key={facilitator.contact?.email}
            >
              <Image
                src={facilitator.image}
                width={200}
                height={200}
                alt={"image of the facilitator" + facilitator.name}
                className="rounded-xl w-full m-auto object-cover md:h-[650px]"
              />
              <div className="p-2 flex-col justify-between">
                <h3 className="text-onPrimaryContainer">{facilitator.name}</h3>
                <p>{facilitator.bio}</p>
                <div className=" flex justify-end w-full text-end">
                  <SocialContactPill
                    instagram={facilitator.social.instagram}
                    facebook={facilitator.social.facebook}
                    twitter={facilitator.social.twitter}
                    email={facilitator.contact?.email}
                    whatsapp={facilitator.contact?.whatsapp}
                  />
                  {facilitator.website && (
                    <SmallLinkButton
                      link={facilitator?.website}
                      text="Learn More"
                      isPrimary={false}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FacilitatorPage;
