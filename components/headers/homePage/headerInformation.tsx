import PurchaseOptions from "@/app/(customer)/PurchaseOptions";

export function FeaturesHorizontalList() {
  return (
    <span className="flex justify-between my-2 text-center items-center w-full m-auto">
      <p className="text-xs md:text-sm border-x-2 w-[110%]">SUGAR FREE</p>
      <p className="text-xs md:text-sm border-r-2 w-[110%]">KETO</p>
      <p className="text-xs md:text-sm border-r-2 w-[100%]">VEGAN</p>
      <p className="text-xs md:text-sm  w-[100%]">ORGANIC</p>
      <p className="text-xs md:text-sm border-x-2 w-[110%]">FAIR TRADE</p>
    </span>
  );
}

export default function HeaderInformation() {
  return (
    <div className="basis-6/12 py-5 px-2 md:px-10 lg:w-1/3">
      <div className="relative w-auto pb-2">
        <h2 className="text-5xl  mt-5">DISCOVER YOUR HEART</h2>
        <FeaturesHorizontalList />
      </div>
      <p className="italic text-sm font-bold p-0">
        &quot;This cacao is absolutely delicious and very nourishing! The energy
        behind the cacao production, its origins and the reverence for the
        medicine from the indigenous cultures that harvest the beans can be
        deeply felt.&quot;
      </p>
      <ul>
        <li className="border-onSecondaryContainer border-b-2 my-2">
          <div className="flex flex-row ">
            <h5 className="text-md">300g</h5>
            <p className="self-end ml-2 text-sm">- Organic Cacao</p>
          </div>
        </li>
        <li className="border-onSecondaryContainer border-b-2 my-2">
          <div className="flex flex-row ">
            <h5 className="text-md">Notes:</h5>
            <p className="ml-2 self-end whitespace-nowrap text-sm">
              Plum, Fudge, Caramel, Raisin
            </p>
          </div>
        </li>
        <li className="border-onSecondaryContainer border-b-2 my-2">
          <div className="flex flex-row">
            <h5 className="text-md">Feels:</h5>
            <p className="ml-2 self-end  text-sm">
              Grounded, Loving, Creative, Expansive
            </p>
          </div>
        </li>
        <li className="border-onSecondaryContainer border-b-2 my-2">
          <div className="flex flex-row ">
            <h5 className="text-md">Buttons:</h5>
            <p className="self-end ml-2 text-sm">
              For easy and intuitive dosing
            </p>
          </div>
        </li>
      </ul>
      <PurchaseOptions isHorizontal compact />
    </div>
  );
}
