import { BulletPoints } from "./BulletPoints";
import { TestimonialQuote } from "./TestimonialQuote";
import Image from "next/image";
export default function TrainingInformation() {
  return (
    <section className="w-11/12 m-auto my-10 md:my-36 py-10 md:px-2 justify-between flex flex-col md:flex-row-reverse  md:bg-secondaryContainer/30 md:shadow md:rounded-3xl">
      <div className="w-full md:w-6/12 md:mr-10 ">
        <Image
          src={"/training/misc/1.jpeg"}
          height={500}
          width={500}
          alt={" An image of a person working with cacao"}
          className="rounded-lg object-cover w-full h-full"
        ></Image>
      </div>
      <div className="w-full md:w-5/12 md:ml-10 px-2">
        <h3 className="mb-5 h-3 mt-5 md:mt-0">Pathway to Mastery</h3>
        <h5 className="mt-3  mb-2  underline">
          Inside Our Facilitator Training
        </h5>
        <p>
          Delve into the heart of ceremonial cacao with a curriculum that is as
          enriching as it is enlightening. Our training program covers
          everything from the historical roots of cacao to the practical aspects
          of facilitating ceremonies.
        </p>
        <TestimonialQuote quote="Being in space with Luzura for the Cacao Facilitator Training was revelationary, filled with compassion, love, and transformative guidance." />
        <h5 className="mt-5 mb-2">Training Elements</h5>
        <BulletPoints
          bulletPoints={[
            {
              name: "Cacao Study",
              effect:
                "Comprehensive study of ceremonial grade cacao, from cultivation to cultural significance.",
            },
            {
              name: "Healing Spaces",
              effect: "Techniques for creating transformative healing spaces.",
            },
            {
              name: "Trauma-Informed Practices",
              effect: "Learning trauma-informed somatic healing practices.",
            },
            {
              name: "Mayan Calendar Integration",
              effect:
                "Integration of Mayan calendar and Mesoamerican spiritual practices in cacao ceremonies.",
            },

            {
              name: "Medicine Songs:",
              effect:
                "Deepen your personal practice and up level your facilitation",
            },
            {
              name: "Plant Study",
              effect:
                "Discover the role of other plant allies + ways to work with them to enhance your ceremonies. From synergetic plants and fungi to use in Cacao recipes to learning elemental cleansing “Limpia” rituals working with Fire, Earth, Water + Air. You will receive an initiation into working with sacred smoke through learning how to use the Copalera / Popoxcomitl and create incense mixes “Sahumerio” using dried herbs and plants.",
            },
          ]}
        />
      </div>
    </section>
  );
}
