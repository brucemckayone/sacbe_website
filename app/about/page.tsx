import React from "react";
import Footer from "@/components/footer";
import Image from "next/image";
import SlideInUp from "@/components/animations/slide_in_up";
interface sectionProps {
  subHeader: string;
  header: string;
  paragraph: string;
  imageUrl?: string;
  reversed?: boolean;
}
const Section = ({
  header,
  imageUrl,
  paragraph,
  subHeader,
  reversed,
}: sectionProps) => (
  <div
    className={`my-10 flex flex-col ${
      reversed ? "md:flex-row-reverse" : "md:flex-row"
    } justify-center mx-5 lg:mx-52`}
  >
    {imageUrl && (
      <Image
        src={imageUrl}
        height={500}
        width={500}
        alt="paragraph image header"
        className="rounded-lg text-center"
        style={{ objectFit: "cover" }}
      />
    )}
    <div
      className={`basis-1/2 md:ml-5 ${
        !reversed && "md:ml-12"
      } flex-col self-center`}
    >
      <h5 className="underline">{subHeader}</h5>
      <h3>{header}</h3>
      <p className="md:w-8/12">{paragraph}</p>
    </div>
  </div>
);
async function About() {
  return (
    <div className="my-10">
      <div className="mx-5 md flex flex-col justify-center items-center">
        <div className="grid  place-items-center">
          <SlideInUp animiation="animate-slide_in_left_fade">
            <Image
              src={"/sacbe_logo_icon.png"}
              height={400}
              width={400}
              alt="paragraph image header"
              className="rounded-b-lg text-center"
              style={{ objectFit: "cover" }}
            />
          </SlideInUp>
          <SlideInUp animiation="animate-slide_in_right_fade">
            <Image
              src={"mayan_ceremonial_cacao_text.svg"}
              height={500}
              width={500}
              alt="paragraph image header"
              className="rounded-b-lg"
              style={{ objectFit: "cover" }}
            />
          </SlideInUp>
        </div>
        <SlideInUp animiation="animate-slide_in_left_fade">
          <h1 className="text-center my-8 text-4xl md:mx-32">
            Concious Sustainably Farmed Ceremonial Cacao
          </h1>
        </SlideInUp>

        <SlideInUp animiation="animate-slide_in_left_fade">
          <div className="mx-5 md:mx-32 lg:mx-56 my-10">
            <h5 className="underline">A LITTE LESS BIG</h5>
            <h3>THE BIGGEST THERE IS</h3>
            <p>
              Minim laboris aliqua officia non magna veniam. Est officia id
              ullamco elit duis tempor id exercitation. Magna exercitation eu
              deserunt minim esse pariatur esse duis. Occaecat voluptate in
              labore pariatur do est ea sit consequat. Ipsum duis pariatur minim
              dolor reprehenderit id. Qui id duis cillum enim Lorem ad culpa
              Lorem. Qui mollit est dolore eiusmod velit amet.
            </p>
          </div>
        </SlideInUp>

        <SlideInUp animiation="animate-slide_in_right_fade">
          <Section
            header="Believe in the pod"
            imageUrl="/cacao_pods_orgins.jpg"
            paragraph="
                Est cupidatat id esse voluptate eu sit excepteur duis ullamco excepteur.
                Magna excepteur dolor irure duis nostrud. Proident aliquip ut qui
                excepteur aliquip enim sit ipsum. Minim cupidatat ullamco culpa ex elit
                quis incididunt. Sint culpa ipsum in magna nulla officia. Do sunt dolor
                sunt consectetur sint aliqua id."
            subHeader="Our Nature"
          ></Section>
        </SlideInUp>
        <SlideInUp animiation="animate-slide_in_left_fade">
          <div className="mx-5 md:mx-32 lg:mx-56 my-10">
            <h5 className="underline">A LITTE LESS BIG</h5>
            <h3>THE BIGGEST THERE IS</h3>
            <p>
              Minim laboris aliqua officia non magna veniam. Est officia id
              ullamco elit duis tempor id exercitation. Magna exercitation eu
              deserunt minim esse pariatur esse duis. Occaecat voluptate in
              labore pariatur do est ea sit consequat. Ipsum duis pariatur minim
              dolor reprehenderit id. Qui id duis cillum enim Lorem ad culpa
              Lorem. Qui mollit est dolore eiusmod velit amet.
            </p>
          </div>
        </SlideInUp>
        <SlideInUp animiation="animate-slide_in_right_fade">
          <Section
            header="Believe in the pod"
            reversed={true}
            imageUrl="/cacao_pods_orgins.jpg"
            paragraph="
                Est cupidatat id esse voluptate eu sit excepteur duis ullamco excepteur.
                Magna excepteur dolor irure duis nostrud. Proident aliquip ut qui
                excepteur aliquip enim sit ipsum. Minim cupidatat ullamco culpa ex elit
                quis incididunt. Sint culpa ipsum in magna nulla officia. Do sunt dolor
                sunt consectetur sint aliqua id."
            subHeader="Our Nature"
          ></Section>
        </SlideInUp>
      </div>
      <Footer />
    </div>
  );
}

export default About;
