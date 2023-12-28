import { TestimonialQuote } from "@/app/(customer)/facilitator-training/TestimonialQuote";
import PurchaseOptions from "@/components/customer/shared/PurchaseOptions";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

export function FeaturesHorizontalList() {
  const commonStyles = "text-xs md:text-sm border-black";
  const pStyleEnd = `${commonStyles} border-x-2 w-[110%]`;
  const pStyleMiddle = `${commonStyles} border-r-2 w-[110%]`;
  const pStyleRegular = `${commonStyles} w-[100%]`;

  return (
    <span className="flex justify-between  my-2 text-center items-center w-full m-auto">
      <p className={`${pStyleEnd} whitespace-nowrap`}>SUGAR FREE</p>
      <p className={pStyleMiddle}>KETO</p>
      <p className={pStyleMiddle}>VEGAN</p>
      <p className={pStyleRegular}>ORGANIC</p>
      <p className={pStyleEnd}>FAIR TRADE</p>
    </span>
  );
}

function ListItem(props: {
  title: string;

  children: string;
}) {
  const listItemStyle =
    "flex-grow border-onSecondaryContainer border-b-2 my-2 text-sm md:text-md lg:text-lg";

  const listTextStyle = "ml-2 self-end whitespace-nowrap border-black";
  return (
    <li className={listItemStyle}>
      <div className="flex flex-row border-black">
        <h5>{props.title}</h5>
        <p className={listTextStyle}>{props.children}</p>
      </div>
    </li>
  );
}

export default function HeaderInformation() {
  return (
    <div className="basis-[45%] lg:basis-[35%] pb-5 px-2 md:px-5 lg:w-2/3 backdrop-blur-sm bg-onPrimary/70 mt-2 rounded-2xl mb-10 lg:mr-5">
      <div className="relative w-auto pb-2">
        <h2 className="text-4xl md:text-4xl mt-5">
          DISCOVER <br /> HEART OPENING <br /> BOUNDLESS ENERGY
        </h2>
        <FeaturesHorizontalList />
      </div>
      <div className="flex md:flex-col flex-col ">
        <TestimonialQuote quote="This cacao is absolutely delicious and very nourishing! The energy behind the cacao production, its origins and the reverence for the medicine from the indigenous cultures that harvest the beans can be deeply felt." />

        <ul className="w-full mb-5 ">
          <ListItem title="300g">- Organic Ecuadorian Cacao</ListItem>
          <ListItem title="Notes:">Plum, Fudge, Caramel, Raisin</ListItem>
          <ListItem title="Feels:">
            Grounded, Loving, Creative, Expansive
          </ListItem>
          <ListItem title="Buttons:">Easy to Measure & Make</ListItem>
        </ul>
      </div>
      <PurchaseOptions isHorizontal={true} compact={false} />
    </div>
  );
}
