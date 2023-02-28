"use client";
import SlideInUp from "../animations/slide_in_up";
import SectionHeader from "../titleHeader";
import Card from "../cards/card";
import BenifitsCard from "../cards/benifits_card";
import reviews from "@/lib/constants/reviews";
import SimpleSlider from "../carousels/testimonial_slider";

export default function BenifitsOfCacao() {
  return (
    <div className="bg-gradient-to-b from-secondaryContainer to-surfaceVarient py-22 md:p-10">
      {/* <SlideInUp animiation="animate-slide_in_right_fade"> */}
      {/* <SectionHeader title="The Experiance"></SectionHeader> */}
      <div className="flex flex-col lg:flex-row">
        <Card hasColor={false} className="xl:basis-1/3 md:basis-1/3">
          <SlideInUp animiation="animate-slide_in_left_fade">
            <h3 className="mb-2">Our customers said it best:</h3>
          </SlideInUp>
          <SlideInUp animiation="animate-slide_in_left_fade">
            <blockquote>
              WOWWWZZAAAA!!!! Now, I have tried a few different Cacao’s but I
              have to say that SACBE is my new absolute fave! The texture &
              taste is soooo smooth, it foams up beautifully in a blender. The
              taste is rich but not too bitter. But the thing that got me the
              most was the sensations it gave me! Mind blowing visuals
              throughout the ceremony, I felt so deeply connected with my heart
              centre and Third eye. Lot’s of colours and pleasant tingles, you
              really can tell its made with love. This is some potent Cacao! It
              set me up amazingly for the day ahead, I just felt so energised
              and full of love & compassion. Honestly if I could give it more
              than 5* I would! Thank you for introducing such a wonderful
              product. I can’t wait to continue using it on my healing journey
              <p className="text-end">
                - Mathilda Heenehan (Very Happy Customer)
              </p>
            </blockquote>
          </SlideInUp>
          <SlideInUp animiation="animate-slide_in_left_fade">
            <p className="p-3">
              We know! We know! It cant really be that good can it? It is. The
              list of health and life style benifits that cacao boasts is
              astonishing. Dont take it from us, the benifits of cacao are
              scientificly backed.
            </p>
          </SlideInUp>
        </Card>
        <Card hasColor={false} className=" xl:basis-2/3 md:basis-2/4 m-0">
          <h3>The Benefits Of Cacao</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 animate-slide_in_up_fade ">
            <BenifitsCard
              headerText="Sustained Energy"
              imagePath="icons/energy_icon.svg"
              text="Long lasting without the jitters"
            ></BenifitsCard>
            <BenifitsCard
              imagePath="icons/mood_icon.svg"
              headerText="Enhanced Mood"
              text="See the world through fresh eyes"
            ></BenifitsCard>
            <BenifitsCard
              imagePath="icons/hammock_icon.svg"
              headerText="Relaxation"
              text="Deep nervous system relaxation"
            ></BenifitsCard>{" "}
            <BenifitsCard
              imagePath="icons/heart_open_icon.svg"
              headerText="Heart Opening"
              text="Presences you to the love that surrounds you"
            ></BenifitsCard>
            <BenifitsCard
              imagePath="icons/focus_icon.svg"
              headerText="Improved Focus"
              text="Sharp content mindful focus"
            ></BenifitsCard>{" "}
            <BenifitsCard
              imagePath="icons/emotional_body_icon.svg"
              headerText="Emotional Body"
              text="Support your emotional body"
            ></BenifitsCard>
            <BenifitsCard
              imagePath="icons/mind_body_icon.svg"
              headerText="Mind & Body "
              text="Deepen your mind body connection"
            ></BenifitsCard>{" "}
            <BenifitsCard
              imagePath="icons/creativity_icon.svg"
              headerText="Creativity"
              text="Helps drop you into sustained a flowstate"
            ></BenifitsCard>
          </div>
        </Card>
      </div>
      {/* </SlideInUp> */}
    </div>
  );
}
