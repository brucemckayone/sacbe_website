"use client";
import PrimaryButton from "@/components/buttons/primaryButton";
import { VitiminPill } from "./VitiminPopovers";

const vits = [
  {
    name: "Magnesium",
    popover:
      "Cacao is an excellent source of magnesium, which plays a crucial role in energy production, muscle function, and maintaining healthy bones and teeth.",
  },
  {
    name: "Iron",
    popover:
      "acao contains iron, which is essential for the production of red blood cells and the transportation of oxygen throughout the body.",
  },
  {
    name: "Calcium",
    popover:
      "Cacao contains small amounts of calcium, which is vital for maintaining strong bones and teeth, as well as for nerve function and muscle contractions.",
  },
  {
    name: "Zinc",
    popover:
      "Cacao contains zinc, an important mineral for immune function, wound healing, and supporting healthy growth and development.",
  },
  {
    name: "Copper",
    popover:
      "Cacao provides copper, which is involved in the production of red blood cells, collagen synthesis, and iron absorption.",
  },
  {
    name: "B1 (Thiamine)",
    popover:
      "Cacao contains thiamine, which helps convert food into energy and supports proper nerve function.",
  },
  {
    name: "B2 (Riboflavin)",
    popover:
      "Cacao contains riboflavin, which plays a role in energy production, growth, and the maintenance of healthy skin.",
  },
  {
    name: "B3 (Niacin)",
    popover:
      "Cacao contains niacin, which is involved in energy metabolism, DNA repair, and the production of stress and sex hormones.",
  },
  {
    name: "B9 (Pantothenic acid)",
    popover:
      "(Pantothenic acid): Cacao contains pantothenic acid, which is essential for the metabolism of carbohydrates, proteins, and fats.",
  },
  {
    name: "B9 (Folate)",
    popover:
      "Cacao provides folate, a crucial vitamin for cell growth, DNA synthesis, and red blood cell production.",
  },
  {
    name: "Flavonoids",
    popover:
      "Cacao is rich in flavonoids, a group of plant compounds with antioxidant properties that can help protect cells against damage caused by free radicals.",
  },
  {
    name: "Theobromine",
    popover:
      "Cacao contains theobromine, a compound that provides a natural stimulant effect, promotes relaxation, and can potentially support cardiovascular health.",
  },
  {
    name: "Phenylethylamine",
    popover:
      "Cacao contains PEA, a compound associated with mood enhancement and the release of endorphins in the brain.",
  },
  {
    name: "Anandamide",
    popover: `Cacao contains anandamide, often referred to as the "bliss molecule," which can promote feelings of happiness and well-being.`,
  },
];

export function VitiminPopovers() {
  return (
    <div className="w-[95%] md:w-10/12 m-auto backdrop-blur-lg flex lg:flex-row flex-col  bg-tertiaryContainer/40 rounded-3xl my-20 py-20 px-3 md:px-10 ">
      <div className="lg:w-1/2 md:pr-10">
        <h2 className="text-6xl  ">
          A Nutrient Dense{" "}
          <strong className="text-sacbeBrandColor stroke-onPrimaryContainer text-stroke-3 text-6xl">
            Super Food
          </strong>
        </h2>
        <p className="md:hidden my-8 ml-1">Tap the tabs for more info</p>
        <div className="lg:hidden flex flex-wrap justify-center my-5 w-11/12 lg:w-7/12 m-auto lg:px-10 group md:my-28 duration-700">
          {vits.map((e) => {
            return (
              <VitiminPill
                key={e.popover + e.name}
                name={e.name}
                popover={e.popover}
              />
            );
          })}
        </div>
        <h5 className="text-2xl  mt-3  font-extrabold z-10">
          Harness this Nutritional Marvel
        </h5>
        <p className="ml-1 z-10 mr-2">
          Cacao is a <strong>nutritional powerhouse</strong>, packed with
          minerals like magnesium, iron, and zinc,{" "}
          <strong>essential for energy production</strong>,{" "}
          <strong> immune function</strong>, and
          <strong> healthy growth</strong>. It iss a good source of vitamins B1,
          B2, B3, B5, and B9,
          <strong> supporting metabolism</strong> and{" "}
          <strong> cell growth</strong>. The flavonoids in Cacao provide
          <strong> antioxidant</strong> benefits, while theobromine and PEA
          contribute to mood
          <strong> enhancement</strong>.
        </p>
        <PrimaryButton
          onClicked={() => {
            open(
              "http://localhost:3000/posts/the-therapeutic-potential-of-cacao--a-comprehensive-analysis-of-its-antioxidant--anti-inflammatory--mood-enhancing--cancer-preventive--and-cognitive-enhancing-properties"
            );
          }}
          text="Learn More"
          isPrimary={false}
          className=""
        />
      </div>
      <div className="hidden lg:flex flex-wrap justify-center w-11/12 md:w-7/12 m-auto md:px-10 md:py-24 py-16 group duration-700">
        {/* <div className="absolute  bg-tertiaryContainer rounded-full h-[500px] w-[700px] -mt-36 blur-2xl group "></div> */}

        {vits.map((e) => {
          return (
            <VitiminPill key={e.popover} name={e.name} popover={e.popover} />
          );
        })}
      </div>
    </div>
  );
}
