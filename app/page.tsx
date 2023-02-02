import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

import NavMenuBottom from "@/components/menu/NavMenuBottom";
import PrimaryButton from "@/components/buttons/primaryButton";
import SecondaryCard from "@/components/cards/secondaryCard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="relative flex">
        <div className="relative flex-1 mt-20 mx-20">
          <Image
            src="/sacbe_shapes_background.png"
            fill
            alt="branding shapes"
            className="flex-1 mx-10"
          />
        </div>
        <div className="flex-1 my-5 m mx-20 italic">
          <Image
            src="/mayan_ceremonial_cacao_text.png"
            width="0"
            height="0"
            sizes="100vw"
            alt="branding shapes"
            className="w-auto"
          />
          <h4 className="">
            My sweet Jesus this is tasty cacao i cant believe the way it makes
            me feel like im Jesus on a 5 star boat ride
          </h4>

          <ol>
            <li className="border-onSecondaryContainer border-b-2 my-5">
              <p>300 g - Organic Product of Ecuador + Belize</p>
            </li>
            <li className="border-onSecondaryContainer border-b-2 my-5">
              <p>300 g - Organic Product of Ecuador + Belize</p>
            </li>
            <li className="border-onSecondaryContainer border-b-2 my-5">
              <p>300 g - Organic Product of Ecuador + Belize</p>
            </li>
            <li className="border-onSecondaryContainer border-b-2 my-5">
              <p>300 g - Organic Product of Ecuador + Belize</p>
            </li>
          </ol>

          <div className="flex content-end">
            <div className="flex-1 rounded-md border-solid border-2 text-center">
              <h4>One-off-purchase</h4>
            </div>
            <div className="flex-1 rounded-md border-2 mx-2 bg-recommendedGreen p-3">
              <h4 className=" w-auto border-b-2 border-onSecondaryContainer mx-5  text-center">
                Subscribe
              </h4>
              <div>
                <h5 className="mb-1">Things You Get</h5>
                <ul className="mx-8">
                  <li>• Coffee</li>
                  <li>• Tea</li>
                  <li>• Milk</li>
                </ul>
                <div className="flex justify-center border-b-2 border-onSecondaryContainer">
                  <PrimaryButton
                    text="Subscribe"
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
              </div>
              <h4 className="text-center">£25.00/month</h4>
            </div>
          </div>
        </div>
      </div>

      <NavMenuBottom />
    </main>
  );
}
