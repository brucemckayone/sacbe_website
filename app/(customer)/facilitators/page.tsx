import React from "react";
import Image from "next/image";
import SmallLinkButton from "@/components/shared/buttons/smallLinkButton";

import facilitatorPageMetadata from "./metadata";
import { SocialContactPill } from "./SocialContactPill";

interface IFacilitatorInfo {
  name: string;
  email?: string;
  website: string;
  social: { instagram?: string; facebook?: string; twitter?: string };
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
              key={facilitator.email}
            >
              <Image
                src={facilitator.image}
                width={200}
                height={200}
                alt={"image of the facilitator" + facilitator.email}
                className="rounded-xl w-full m-auto object-cover h-96"
              />
              <div className="p-2 flex-col justify-between">
                <h3 className="text-onPrimaryContainer">{facilitator.name}</h3>
                <p>{facilitator.bio}</p>
                <div className=" flex justify-end w-full text-end">
                  <SocialContactPill
                    instagram={facilitator.social.instagram}
                    facebook={facilitator.social.facebook}
                    twitter={facilitator.social.twitter}
                    email={facilitator.email}
                  />
                  <SmallLinkButton
                    link={facilitator.website}
                    text="Learn More"
                    isPrimary={false}
                  />
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
