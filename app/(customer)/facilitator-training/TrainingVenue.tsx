import Image from "next/image";
import { BulletPoints } from "./BulletPoints";
import { ISlide, SmoothCarousel } from "./TrainingIntroduction";

const slides: ISlide[] = [
  {
    title: "Tranquil Learning Retreat",
    buttonLink: "/training/venue",
    buttonText: "Discover Venue",
    description:
      "A modern villa nestled in Aberdeenshire's tranquility, perfect for reflective learning.",
    image: "/training/venue/2.webp",
  },
  {
    title: "Culinary Comforts",
    buttonLink: "/training/accommodation",
    buttonText: "Explore Accommodations",
    description:
      "Cozy, fully-equipped kitchen to nourish and gather in warmth during your stay.",
    image: "/training/venue/3.webp",
  },
  {
    title: "Gather and Nourish",
    buttonLink: "/training/accommodation",
    buttonText: "View Kitchen",
    description:
      "Delight in our inviting kitchen, the heart of communal culinary creation.",
    image: "/training/venue/4.webp",
  },
  {
    title: "Cozy Communal Spaces",
    buttonLink: "/training/living-area",
    buttonText: "Explore Living Area",
    description:
      "Relax and connect in our vibrant living area, adorned with cultural charm.",
    image: "/training/venue/5.webp",
  },
  {
    title: "Dining and Dialogue",
    buttonLink: "/training/dining",
    buttonText: "See Dining Space",
    description:
      "Dine amidst nature in our sunlit space, perfect for nourishing meals and meaningful conversations.",
    image: "/training/venue/6.webp",
  },
  {
    title: "Restful Retreat",
    buttonLink: "/training/accommodation",
    buttonText: "View Accommodations",
    description:
      "Serene, comfortable twin room for a peaceful end to a day of learning.",
    image: "/training/venue/7.webp",
  },
  {
    title: "Elegant Simplicity",
    buttonLink: "/training/accommodation",
    buttonText: "View Room",
    description:
      "Charming suspended bed with a view, merging comfort with the beauty of nature.",
    image: "/training/venue/8.webp",
  },
  {
    title: "Natural Serenity",
    buttonLink: "/training/accommodation",
    buttonText: "View Room",
    description:
      "Wake up to peaceful forest views in a room that radiates calm and comfort.",
    image: "/training/venue/9.webp",
  },
  {
    title: "Lounge in Elegance",
    buttonLink: "/training/lounge",
    buttonText: "View Lounge",
    description:
      "A plush lounge space, where comfort meets the calm of nature's embrace.",
    image: "/training/venue/10.webp",
  },
  {
    title: "Tranquil Twin Stay",
    buttonLink: "/training/accommodation",
    buttonText: "View Twin Room",
    description:
      "Spacious twin room with rustic charm, offering a peaceful retreat into nature.",
    image: "/training/venue/11.webp",
  },
  {
    title: "Tranquil Twin Stay",
    buttonLink: "/training/accommodation",
    buttonText: "View Room",
    description:
      "A serene twin room with soft floral touches, offering a peaceful retreat.",
    image: "/training/venue/12.webp",
  },
  {
    title: "Elegant Private Quarters",
    buttonLink: "/training/accommodation",
    buttonText: "View Room",
    description:
      "Sophisticated solitude with a touch of elegance for your restful sanctuary.",
    image: "/training/venue/13.webp",
  },
  {
    title: "Spa-Like Serenity",
    buttonLink: "/training/accommodation",
    buttonText: "View Amenities",
    description:
      "Indulge in relaxation with our spa-inspired bath, designed for your rejuvenation.",
    image: "/training/venue/14.webp",
  },
];

export default function TrainingVenue(props: {
  foodRef: React.MutableRefObject<null>;
}) {
  //should include description of the place images of the bedrooms
  return (
    <section className="w-11/12 m-auto md:mt-64md:p-5 p-0">
      <div className="">
        <h3 className="md:text-7xl text-center md:mb-10">
          The Sanctuary & Private Forest
        </h3>
        <div className="rounded-3xl overflow-clip">
          <Image
            src={"/training/venue/1.webp"}
            alt={"Aberdeenshire Villa Venue Image"}
            width={500}
            height={500}
            className="object-cover w-full  h-[300px] md:h-[600px] rounded-xl my-2 "
          />
          <SmoothCarousel slides={slides} hideButton />
        </div>
        <div className="flex flex-col md:flex-row mt-10 justify-around w-full">
          <div className="hidden md:flex w-full md:w-1/2">
            <Image
              src={"/home_header/home_page_header_image_1.jpg"}
              alt={"A person working with ceremonial cacao"}
              width={1000}
              height={1000}
              style={{ width: "100%", height: "100%" }}
              className="rounded-lg drop-shadow-sm h-fit object-cover flex-grow"
            />
          </div>
          <div className="mt-5 md:w-5/12">
            <p>
              Our holding field for this training is a beautiful spacious villa,
              set within peaceful and idyllic surroundings, featuring large
              gardens (which will be in the fullness of Spring) and a private
              woodland of sacred birch trees. Giving plenty of places to connect
              with nature, recharge and integrate the teachings. The area of
              Banchory, Aberdeenshire is known for its stunning landscapes and
              Crathes Castle.
            </p>
            <h5 className="mt-5 mb-2">Villa Features</h5>
            <BulletPoints
              bulletPoints={[
                {
                  name: "Location",
                  effect: "Located in the picturesque Banchory, Scotland.",
                },
                {
                  name: "Setting",
                  effect:
                    "Spacious and serene setting ideal for learning and introspection.",
                },
                {
                  name: "Accommodations",
                  effect:
                    "Comfortable accommodations surrounded by natural beauty.",
                },
              ]}
            />
            <h4 className="mt-5">Accommodation and Amenities</h4>
            <p>
              Your comfort and well-being are paramount during your stay. We
              have ensured that every aspect of your accommodation contributes
              to a restful and nourishing experience, supporting you throughout
              your training.
            </p>
            <h5 className="mt-5 mb-2">Comforts and Conveniences</h5>
            <BulletPoints
              bulletPoints={[
                {
                  name: "Accommodation Options",
                  effect: "Choice of single or shared accommodation options.",
                },
                {
                  name: "Plant-Based Meals",
                  effect:
                    "3 x daily nourishing plant based meals provided by our experienced chef (introduction coming soon!) who will create from seasonal, locally sourced produce which serves both the people and the land. Dietary requirements will be accommodated, please contact us with your request.",
                  ref: props.foodRef,
                },
                {
                  name: "Travel Arrangements:",
                  effect:
                    " If you are travelling some distance, it is recommended you arrive and stay nearby the night before as we will be gathering at the villa at 10am on the18th. You will depart on 24th between 1-2pm after our closing brunch / feast!",
                },
              ]}
            />
            <p className="mt-3">
              The venue is located 30 minutes drive from Aberdeen Airport and 40
              minutes from the train station / city centre just outside the town
              of Banchory. You can get a taxi directly to the venue. Closer to
              the time, we will support the group in organising car shares to
              make the journey as easy as possible.
            </p>
            <p className="mt-3">
              Alternatively, there is the 727 bus service from the airport into
              the bus station in the city centre, where you can get the 201 bus
              for Ballater to Banchory and then take a 5 minute taxi ride to the
              villa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
