import Image from "next/image";
import Link from "next/link";
import dollarIcon from "@/public/icons/dollar_icon.svg";
import klarnIcon from "@/public/icons/payment/klarna.svg";
import afterpayIcon from "@/public/icons/payment/afterpay.svg";
import climateIcon from "@/public/icons/stripe_climate_change_badge.svg";
import fairTradeIcon from "@/public/icons/fair_trade_logo.svg";
type props = {
  isHorizontal: boolean;
} & typeof defaultProps;
const defaultProps = {
  isHorizontal: false,
};

export function RiskApealCards(props: props) {
  return (
    <div
      className={`flex ${
        props.isHorizontal ? " md:flex-row flex-col" : "flex-col"
      } justify-around`}
    >
      <div
        className={`flex flex-row ${
          props.isHorizontal && "md:mr-5"
        } p-2 rounded-xl drop-shadow-lg bg-surface mt-5`}
      >
        <Image
          src={climateIcon}
          width={70}
          height={70}
          alt="Climate change badge a a partner with sacbe cacao and our climate change pledge"
          className="mr-2 h-10 w-10 self-center"
          // placeholder="blur"
        />
        <div>
          <h4 className="text-xl">Earth Pledge</h4>
          <p className="text-sm">
            <strong className="text-sm text-onPrimaryContainer">
              Make a difference with every sip,
            </strong>{" "}
            find out how we are helping &nbsp;
            <Link
              className="text-sacbeBrandColor"
              href={"https://climate.stripe.com/ThyMCu"}
            >
              fight climate change
            </Link>
          </p>
        </div>
      </div>
      <div
        className={`flex flex-row ${
          props.isHorizontal && "md:mr-5"
        } p-2 rounded-xl drop-shadow-lg bg-surface mt-5`}
      >
        <Image
          src={dollarIcon}
          width={70}
          height={70}
          alt="dollor icon a symbol of flexible payments"
          className="mr-2 h-10 w-10 self-center"
        />
        <div>
          <div className="flex justify-between">
            <h4 className="text-xl">Flexible Payments</h4>
            <div className="flex">
              <Image
                src={klarnIcon}
                width={100}
                height={10}
                alt="Klarna icon showing that we accept klarna payments"
                className="mr-2 w-10  md:w-16 self-center"
              />
              <Image
                src={afterpayIcon}
                width={70}
                height={10}
                alt="After pay icon showing that we accept after pay payments for instalments"
                className="mr-2  w-10 md:w-16 self-center"
              />
            </div>
          </div>
          <p className="text-sm">
            <strong className="text-sm text-onPrimaryContainer">
              Buy Now Pay later
            </strong>
            , or spread the cost with
            <strong className="text-sm text-onPrimaryContainer">
              {" "}
              small installments
            </strong>
            as low as{" "}
            <strong className="text-sm text-onPrimaryContainer">£8.25</strong>,
            all with a
            <strong className="text-sm text-onPrimaryContainer">
              {" "}
              100% money back garentee
            </strong>
          </p>
        </div>
      </div>
      <div className="flex flex-row  p-2 rounded-xl drop-shadow-lg bg-surface mt-5 ">
        <Image
          src={fairTradeIcon}
          width={70}
          height={70}
          alt="Icon Text "
          className="mr-2 h-10 w-10 self-center"
        />
        <div>
          <h4 className="text-xl">Fair Trade</h4>
          <p className="text-sm">
            Sacbe supports{" "}
            <strong className="text-sm text-onPrimaryContainer">
              fair trade farming, tradition, and communities,
            </strong>{" "}
            honoring this
            <strong className="text-sm text-onPrimaryContainer">
              {" "}
              incredible plant
            </strong>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
