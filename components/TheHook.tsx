import Image from "next/image";
import SlideInUp from "@/components/animations/slide_in_up";
import Card from "@/components/cards/card";
import chocolateButtonImage from "@/public/cacaobuttonsWithShadow.png";
import dropshadow from "@/public/drop_shadow.png";

import Link from "next/link";
import { GetOfferButton } from "./GetOfferButton";

function CheckListItem(props: any) {
  return (
    <li>
      <p>
        <span className="text-darkGreen">✓</span> {props.text}
      </p>
    </li>
  );
}

function CheckList() {
  return (
    <div className="ml-1 my-4 p-2 lg:w-2/3">
      <p>
        <strong>A multitude of benefits</strong>:
      </p>
      <ol className="ml-3 list">
        <CheckListItem text={"Nervous system support"} />
        <CheckListItem text={"Improve mental health"} />
        <CheckListItem text={"Improved cardiovascular function and recovery"} />
        <CheckListItem text={"Powerful Mood Enhancement"} />
        <CheckListItem text={"Nervous system support"} />
      </ol>
      <Link
        className="ml-6 mt-4"
        href={
          "/posts/the-therapeutic-potential-of-cacao--a-comprehensive-analysis-of-its-antioxidant--anti-inflammatory--mood-enhancing--cancer-preventive--and-cognitive-enhancing-properties"
        }
      >
        Learn More
      </Link>
    </div>
  );
}

export function TheHook() {
  return (
    <div>
      <h2 className="w-11/12 md:w-8/12 text-center text-4xl md:text-6xl lg:text-8xl m-auto pt-20">
        From the Heart of the Earth to Yours
      </h2>
      <h2 className="w-11/12 md:w-8/12 text-center m-auto py-6">
        <strong className="text-sacbeBrandColor text-stroke-3 text-5xl md:text-7xl lg:text-8xl ">
          SACBE CEREMONIAL CACAO
        </strong>
      </h2>
      <div className="flex flex-col-reverse lg:flex-row w-[95%] md:w-10/12  px-2 md:px-10 m-auto py-5 md:mt-36 backdrop-blur-lg bg-primaryContainer/20 rounded-3xl">
        <div className="md:w-10/12 lg:w-7/12 m-auto">
          <>
            <div className="font-extrabold">
              <h3 className="text-2xl md:text-4xl mt-5">
                The Food Of The Gods
              </h3>
            </div>
            <p className="ml-1 mb-2">
              {" "}
              If you could have a drink dense in essential minerals that
              <strong> nourishes</strong> your body, supports your{" "}
              <strong>immune system</strong>, gives you a feeling of
              <strong> elevation and gratitude</strong>, provides{" "}
              <strong>long-lasting joyful energy</strong>, and leaves you{" "}
              <strong>free of anxiety and jitters</strong>, all while giving you
              the opportunity to bring <strong>deep meaning and purpose</strong>{" "}
              to your morning ritual, would you be interested?{" "}
            </p>
            <p className="ml-1">
              Indulging in the ceremonial cacao of Sacbe is not only a
              <strong> soul-nourishing experience</strong> but also a gift to
              your overall well-being. Beyond its delicious flavour This sacred
              elixir holds<br></br>
            </p>
          </>
          <CheckList />

          <GetOfferButton />
          <p className="ml-1">
            Cacao offers a space to receive nourishment, clarity and healing,
            for your physical, metaphysical and emotional bodies - wherever you
            are on your journey.
          </p>

          <h3 className="text-2xl md:text-4xl mt-5 font-extrabold">
            A Blissful Balance
          </h3>
          <p className="ml-1 ">
            Unlike drinks other that leave us gittery and anxious, Sacbe Cacao
            offers <strong>more than a mere energy boost</strong>. It is a
            harmonious blend of
            <strong> invigoration and grounding</strong>, providing a balanced
            experience for both your <strong>mind, body and soul</strong>. Feel
            the gentle yet <strong> energising</strong>, and{" "}
            <strong> boundless heart opening</strong> effects that sustain you{" "}
            <strong> throughout the day</strong>, empowering you to embrace
            lifes challenges, and adventures with{" "}
            <strong> renewed vitality</strong>.
          </p>
        </div>
        <Card className="12 md:basis-1/2" hasColor={false}>
          <div className="absolute  md:w-5/12 p-40 bg-primaryContainer rounded-full h-[500px] lg:h-[700px] blur-md -z-10 pr-36 md:mr-0"></div>
          <SlideInUp animiation="animate-zoom_in_fade">
            <div className="relative w-8/12 m-auto p-40 h-[500px] lg:h-[720px] z-50">
              <Image
                src={chocolateButtonImage}
                fill
                className="object-contain z-50 mt-20 md:pr-0 pr-8 "
                alt="Sacbe Cacao Chocolate buttons packed ontop of eachother"
              />
            </div>
            <h3 className="text-center text-sm md:text-sm font-extrabold  backdrop-blur-2xl bg-onSecondary/20 border rounded-lg p-2  md:mx-20 z-50">
              1 Gram Buttons for Intuitive Dosing
            </h3>
          </SlideInUp>
        </Card>
      </div>
    </div>
  );
}
