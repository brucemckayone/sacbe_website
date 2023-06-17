import { RiskApealCards } from "../app/(customer)/RiskApealCards";
import Image from "next/image";
import SlideInUp from "@/components/animations/slide_in_up";
import Card from "@/components/cards/card";
import chocolateButtonImage from "@/public/chocolate_buttons.png";
import dropshadow from "@/public/drop_shadow.png";
export function TheHook() {
  return (
    <div className="bg-tertiaryContainer">
      <div className="">
        <h2 className="w-11/12 md:w-7/12 text-center text-5xl md:text-8xl m-auto pt-20">
          Seeking Inner Bliss and Vitality? Embrace the
          <strong className="md:text-sacbeBrandColor font-thin text-onPrimaryContainer md:text-stroke-3 text-5xl md:text-8xl">
            {" "}
            Transformative Power of {""} <br></br>
            <strong className="text-sacbeBrandColor text-stroke-3 text-7xl md:text-8xl ">
              SACBE CACAO
            </strong>
          </strong>
        </h2>
        <div className="flex flex-col-reverse md:flex-row w-11/12 md:w-9/12 m-auto py-20 md:py-36">
          <div className="  md:w-5/12 m-auto">
            <div className="font-extrabold">
              <h3 className="text-2xl mt-5">Embrace The Wonders Of Cacao</h3>
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
              your overall well-being. Beyond its enchanting flavor, this sacred
              elixir holds a <strong> multitude of health benefits</strong>.
              That can support you in your journey what ever it may be.
            </p>
            <h3 className="text-2xl mt-5 font-extrabold">
              Discover a Blissful Balance
            </h3>
            <p className="ml-1 ">
              Unlike drinks other that leave us gittery and anxious, Sacbe Cacao
              offers <strong>more than a mere energy boost</strong>. It is a
              harmonious blend of
              <strong> invigoration and grounding</strong>, providing a balanced
              experience for both your <strong>mind, body and soul</strong>.
              Feel the gentle yet <strong> energizing</strong>, and{" "}
              <strong> boundless heart opening</strong> effects that sustain you{" "}
              <strong> throughout the day</strong>, empowering you to embrace
              lifes challenges, and adventures with{" "}
              <strong> renewed vitality</strong>.
            </p>
          </div>
          <Card className="flex md:basis-1/2" hasColor={false}>
            <div className="absolute w-11/12 md:w-4/12 p-40 bg-primaryContainer rounded-full h-[500px] blur-md"></div>
            <SlideInUp animiation="animate-zoom_in_fade">
              <div className="relative w-full p-40 h-[500px]  ">
                <div className="absolute bottom-0 left-0 h-[140px] w-full">
                  <Image
                    src={dropshadow}
                    fill
                    alt="Drop Shadow for buttons"
                    className="object-contain"
                  ></Image>
                </div>

                <div
                  className={`absolute top-10 right-0 left-0 w-full h-[540px]`}
                >
                  <Image
                    src={chocolateButtonImage}
                    fill
                    className="object-contain"
                    alt="Sacbe Cacao Chocolate buttons packed ontop of eachother"
                  ></Image>
                </div>
              </div>
            </SlideInUp>
          </Card>
        </div>
      </div>
    </div>
  );
}
