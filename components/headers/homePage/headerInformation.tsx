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
    <div className="basis-[45%] lg:basis-[35%] pb-5 px-2 md:px-5 lg:w-2/3 backdrop-blur-lg bg-onPrimary/70 mt-6 rounded-2xl mb-10 lg:mr-10">
      <div className="relative w-auto pb-2">
        <h2 className="text-4xl md:text-4xl mt-5">
          DISCOVER <br /> HEART OPENING <br /> BOUNDLESS ENERGY
        </h2>
        <FeaturesHorizontalList />
      </div>
      <div className="flex md:flex-col flex-col">
        <div className=" w-full  flex flex-col justify-center  rounded border  p-2">
          <p className="italic text-xs font-bold  ">
            &quot;This cacao is absolutely delicious and very nourishing! The
            energy behind the cacao production, its origins and the reverence
            for the medicine from the indigenous cultures that harvest the beans
            can be deeply felt.&quot;
          </p>
        </div>
        <ul className=" w-full md:w-7/12lg:mr-10">
          <li className="border-onSecondaryContainer  border-b-2 my-2">
            <div className="flex flex-row ">
              <h5 className="text-sm">300g</h5>
              <p className="self-end ml-2 text-sm md:text-md ">
                - Organic Ecuadorian Cacao
              </p>
            </div>
          </li>
          <li className="border-onSecondaryContainer border-b-2 my-2">
            <div className="flex flex-row ">
              <h5 className="text-sm">Notes:</h5>
              <p className="ml-2 self-end whitespace-nowrap text-sm md:text-md">
                Plum, Fudge, Caramel, Raisin
              </p>
            </div>
          </li>
          <li className="border-onSecondaryContainer border-b-2 my-2 md:text-md">
            <div className="flex flex-row">
              <h5 className="text-sm">Feels:</h5>
              <p className="ml-2 self-end whitespace-nowrap text-sm md:text-md">
                Grounded, Loving, Creative, Expansive
              </p>
            </div>
          </li>
          <li className="border-onSecondaryContainer border-b-2 my-2">
            <div className="flex flex-row ">
              <h5 className="text-sm">Buttons:</h5>
              <p className="self-end ml-2 text-sm md:text-md">
                For easy and intuitive dosing
              </p>
            </div>
          </li>
        </ul>
      </div>
      <PurchaseOptions isHorizontal={true} compact={false} />
    </div>
  );
}
