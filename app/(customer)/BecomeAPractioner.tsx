import Card from "@/components/cards/card";
import Image from "next/image";
import LinkButton from "@/components/buttons/LinkButton";
import SlideInUp from "@/components/animations/slide_in_up";
import cacaoFacilatorImage from "@/public/cacaofacilitator.png";
export function BecomeAPractioner() {
  return (
    <div className=" bg-gradient-to-b to-primaryContainer from-tertiaryContainer py-10">
      <div className="flex flex-col justify-center align-middle">
        <h2 className="flex justify-center text-center pt-32 pb-20 text-6xl md:text-7xl">
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
            <div className="basis-1/2">
              <SlideInUp animiation="animate-slide_in_left_blur">
                <h5 className="flex md:w-1/2 underline">
                  Become A Practitioner
                </h5>
              </SlideInUp>
              <SlideInUp animiation="animate-slide_in_left_blur">
                <h3 className="flex md:w-3/4">Cacao Facilitation Training</h3>
              </SlideInUp>
              <SlideInUp animiation="animate-slide_in_left_blur">
                <p className="flex md:w-3/5 text-xl">
                  We welcome those wishing to work with for cacao to join us in
                  an 6 night emmersive training in the wild depths of the
                  scottish highlands where you will develope your skills as a
                  space holder & gaurdian of cacao.
                </p>
              </SlideInUp>
              <SlideInUp
                key={"sky on eart slidy"}
                animiation="animate-slide_in_left_blur"
              >
                <LinkButton
                  key={"sky on on earth thingy"}
                  url="https://skyeonearth.com/cacaofacilitation"
                  isPrimary={false}
                  text="Learn More"
                ></LinkButton>
              </SlideInUp>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
