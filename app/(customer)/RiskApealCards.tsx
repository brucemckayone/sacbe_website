import Image from "next/image";
import Link from "next/link";

export function RiskApealCards() {
  return (
    <div className=" flex flex-col md:flex-row  justify-around ">
      <div className="flex flex-row md:w-3/12 p-2 rounded-xl drop-shadow-lg bg-surface mt-5 mx-2">
        <Image
          src={"/icons/stripe_climate_change_badge.svg"}
          width={70}
          height={70}
          alt="Icon Text "
          className="mr-2 h-10 w-10 self-center"
        />
        <div>
          <h4 className="text-xl">Earth Pledge</h4>
          <p className="text-sm">
            Make a difference with every sip, find out how we are helping &nbsp;
            <Link
              className="text-sacbeBrandColor"
              href={"https://climate.stripe.com/ThyMCu"}
            >
              fight climate change
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-row md:w-3/12 p-2 rounded-xl drop-shadow-lg bg-surface mt-5 mx-2 ">
        <Image
          src={"/icons/dollar_icon_green.svg"}
          width={70}
          height={70}
          alt="Icon Text "
          className="mr-2 h-10 w-10 self-center"
        />
        <div>
          <h4 className="text-xl">Flexible Payments</h4>
          <p className="text-sm">
            <strong className="text-sm text-onPrimaryContainer">
              Buy Now Pay later
            </strong>
            , or spread it out with
            <strong className="text-sm text-onPrimaryContainer">
              {" "}
              small installments
            </strong>
            , all with a
            <strong className="text-sm text-onPrimaryContainer">
              {" "}
              100% money back garentee
            </strong>
          </p>
        </div>
      </div>
      <div className="flex flex-row  md:w-3/12 p-2 rounded-xl drop-shadow-lg bg-surface mt-5 mx-2">
        <Image
          src={"/icons/heart.svg"}
          width={70}
          height={70}
          alt="Icon Text "
          className="mr-2 h-10 w-10 self-center"
        />
        <div>
          <h4 className="text-xl">Earth Pledge</h4>
          <p className="text-sm">We donate to eco causes with every sale</p>
        </div>
      </div>
    </div>
  );
}
