import React from "react";

import Image from "next/image";
import SlideInUp from "@/components/animations/slide_in_up";

import Link from "next/link";
import { Section } from "./Section";

import { AboutClouds } from "../wholesale/AboutClouds";
import { Metadata } from "next";

const description =
  "Learn about our mission, values, and the story behind our brand. Discover how we are dedicated to providing high-quality products, fostering sustainable practices, and promoting wellness. Explore our About page to understand our commitment to your well-being and the positive impact we strive to make in the world.";
export const metadata: Metadata = {
  title: "About",
  description: description,
  keywords: [
    "Mission",
    "Values",
    "Brand story",
    "High-quality",
    "Sustainability",
    "Wellness",
    "Commitment",
    "Vision",
    "Expertise",
    "Community",
  ],
  twitter: {
    card: "summary_large_image",
    site: "@SacbeCacao",
    title: "About",
    description: description,
  },
  openGraph: {
    type: "website",
    url: "https://sacbe-ceremonial-cacao.com/about",
    title: "About",
    description: description,
    siteName: "Sacbe Cacao",
  },

  alternates: {
    canonical: "https://sacbe-ceremonial-cacao.com/about",
  },
};

export interface sectionProps {
  subHeader: string;
  header: string;
  paragraph: string;
  imageUrl?: string;
  reversed?: boolean;
}

async function About() {
  return (
    <div>
      <AboutClouds />
      <div className="bg-gradient-to-b from-tertiaryContainer to-primaryContainer">
        <div className="py-10 flex flex-col w-11/12 md:w-9/12 m-auto justify-center ">
          <div className="mx-5 md flex flex-col justify-center items-center">
            <TextSection
              key={"aegaergaergaergargaegacer"}
              largeHeader="Ethically sourced cooperatives"
              smallHeader="Fairly traded and sustainable cacao"
              body=" Sacbe Cacao is your source for high-quality ceremonial cacao from
                  Ecuador. Our cacao is sourced from small-scale, family-owned
                  farmers cooperatives, ensuring that it is fairly traded and
                  sustainably grown."
            />
            <Section
              header="Organically and sustainably grown in Esmeraldas"
              imageUrl="/cacao_pods_orgins.jpg"
              paragraph="Our cacao is organically and sustainably grown in Esmeraldas, a land known for its bio-diversity and rich flavor profile. We source our cacao from Arriba Nacional beans grown at an altitude of 2000 meters, contributing to its unique flavor and strong spirit."
              subHeader="Andean-sourced Arriba Nacional beans"
            ></Section>
            {/*
            <h2 className="self-start text-6xl md:text-9xl w-11/12 md:w-7/12  md:mx-20 mt-10 ">
              More than just Chocolate
            </h2> */}
            <TextSection
              largeHeader="Heart opening, heightened creativity"
              smallHeader="Mood upliftment, emotional support"
              body=" Our cacao is more than just a beverage. It is a sacred plant medicine
              that has been used for centuries in spiritual and healing traditions
              around the world. It is grounding and loving, and it offers mood
              upliftment, emotional body support, heart opening, and heightened
              creativity. It supports the mind-body connection and helps to relax
              the nervous system, allowing you to connect with your inner self and
              the divine."
              key={"aegraergaae"}
            />
            <Section
              header="Online and in-person cacao ceremonies"
              reversed={true}
              imageUrl="/community_cacao.webp"
              paragraph="At Sacbe Cacao, we offer online and in-person cacao ceremonies, which are powerful containers of community connection that facilitate personal transformation. Each ceremony is guided by the Maya Cosmovision and infused with breathwork, meditation, movement practices, and sound therapy. It is a sacred space for you to connect with yourself and others and to explore the depths of your soul."
              subHeader="Powerful community connections"
            ></Section>
            <TextSection
              largeHeader="Commitment to sustainability"
              smallHeader="Eco-friendly pouches"
              body="We are committed to sustainability and eco-friendliness. Our pouches are fully recyclable, featuring labels made from recycled wood pulp and printed with vegetable inks. We believe that caring for the earth is an essential part of the spiritual journey."
              key={"aegraergaae"}
            />
            <Section
              header="Enjoy daily or in ceremony"
              imageUrl="/cacao_pods_orgins.jpg"
              paragraph="Our cacao can be enjoyed as a daily morning ritual or in ceremony, and it can be paired with journaling, meditation, breath, and movement to amplify its effects and explore your inner space. It is a powerful tool for spiritual growth and self-discovery. Our cacao is organically and sustainably grown in Esmeraldas, a land known for its bio-diversity and rich flavor profile. We source our cacao from Arriba Nacional beans grown at an altitude of 2000 meters, contributing to its unique flavor and strong spirit."
              subHeader=""
            ></Section>
            <TextSection
              key={"aerg"}
              largeHeader="Join us for our next cacao ceremony"
              body="If you're looking for high-quality ceremonial cacao, look no further than Sacbe Cacao. Join us for our next cacao ceremony and experience the power of Ceremonial Cacao from Ecuador. Connect with yourself, connect with others, and connect with the divine."
              smallHeader=""
            />
            <Link
              href={
                "https://www.thirdeyetribe.co.uk/events/third-eye-community-cacao/"
              }
            >
              {" "}
              <div className="px-4 py-2 rounded-lg border-2 my-5 bg-sacbeBrandColor">
                <h4>Join Us In Ceremony</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
function TextSection({
  body,
  smallHeader,
  largeHeader,
}: {
  body: string;
  smallHeader: string;
  largeHeader: string;
}) {
  return (
    <SlideInUp animiation="animate-slide_in_left_fade">
      <h5 className=" text-2xl underline">{smallHeader}</h5>
      <h3 className=" text-4xl mb-5">{largeHeader}</h3>
      <p className="text-xl">{body}</p>
    </SlideInUp>
  );
}
