"use client";
import dynamic from "next/dynamic";
import Card from "../cards/card";
import Image from "next/image";
export default function BenifitsOfCacao() {
  const BenifitsCard = dynamic(() =>
    import("../cards/benifits_card").then((res) => res.default)
  );

  return (
    <div className="flex flex-col lg:flex-row w-full md:w-10/12 m-auto backdrop-blur-lg bg-onPrimary/50 rounded-3xl my-20">
      <div className="xl:basis-1/3 md:basis-1/3 self-center flex flex-col justify-stretch ">
        <Image
          src={"/home_header/home_page_header_image_8.jpg"}
          width={700}
          height={900}
          alt="alt"
          className="rounded-xl md:rounded-3xl  h-[500px] md:h-[650px] object-cover "
        />
      </div>
      <Card
        hasColor={false}
        className="w-full justify-around xl:basis-1/2 md:basis-2/4 m-0"
      >
        <h3 className="text-6xl  md:pb-10">Benefits of Cacao</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 animate-slide_in_up_fade ">
          <BenifitsCard
            headerText="Sustained Energy"
            imagePath="/icons/energy_icon.svg"
            text="Long lasting without the jitters"
          />
          <BenifitsCard
            imagePath="/icons/mood_icon.svg"
            headerText="Enhanced Mood"
            text="See the world through fresh eyes"
          />
          <BenifitsCard
            imagePath="/icons/hammock_icon.svg"
            headerText="Relaxation"
            text="Deep nervous system relaxation"
          />
          <BenifitsCard
            imagePath="/icons/heart_open_icon.svg"
            headerText="Heart Opening"
            text="Presences you to the love that surrounds you"
          />
          <BenifitsCard
            imagePath="/icons/focus_icon.svg"
            headerText="Improved Focus"
            text="Sharp content mindful focus"
          />
          <BenifitsCard
            imagePath="/icons/emotional_body_icon.svg"
            headerText="Emotional Body"
            text="Support your emotional body"
          />
          <BenifitsCard
            imagePath="/icons/mind_body_icon.svg"
            headerText="Mind & Body "
            text="Deepen your mind body connection"
          />{" "}
          <BenifitsCard
            imagePath="/icons/creativity_icon.svg"
            headerText="Creativity"
            text="Helps drop you into sustained a flowstate"
          />
        </div>
      </Card>
    </div>
  );
}
