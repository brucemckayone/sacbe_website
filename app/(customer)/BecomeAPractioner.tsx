import Card from "@/components/cards/card";
import Image from "next/image";
import LinkButton from "@/components/buttons/LinkButton";
import SlideInUp from "@/components/animations/slide_in_up";
import cacaoFacilatorImage from "@/public/cacao-facilitator-training.png";

export function BecomeAPractioner() {
  return (
    <div className=" bg-gradient-to-b to-primaryContainer from-tertiaryContainer py-10">
      <div className="flex flex-col justify-center align-middle ">
        <h2 className="m-auto w-full text-center pt-32 pb-20 text-5xl md:text-7xl">
          CACAO FACILITATION TRAINING
        </h2>
        <div className="flex flex-col md:flex-row ">
          <div></div>

          <Card className="flex basis-1/2" hasColor={false}>
            <SlideInUp animiation="animate-zoom_in">
              <Image
                src={cacaoFacilatorImage}
                alt="cacao facilitator training image certificate badge object"
                className="object-contain"
                placeholder="blur"
              />
            </SlideInUp>
          </Card>

          <Card
            className="basis-2/5 flex flex-col justify-center items-center align-middle"
            hasColor={false}
          >
            <div className="basis-1/2 md:basis-2/3">
              <h5 className="flex md:w-7//12 underline">
                Become A Practitioner
              </h5>

              <h3 className="flex md:w-3/4">Cacao Facilitation Training</h3>

              <p className="flex md:w-3/5 text-xl">
                We welcome those wishing to work with for cacao to join us in an
                6 night immersive training in the wild depths of the scottish
                highlands where you will develop your skills as a space holder &
                guardian of cacao.
              </p>

              <LinkButton
                key={"sky on on earth thingy"}
                url="https://skyeonearth.com/cacaofacilitation"
                isPrimary={false}
                text="Learn More"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
