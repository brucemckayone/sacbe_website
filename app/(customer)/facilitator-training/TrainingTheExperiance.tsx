import { BulletPoints } from "./BulletPoints";
import Image from "next/image";
export default function TrainingTheExperiance() {
  return (
    <section className="w-11/12 m-auto my-10 md:my-36 md:bg-sacbeBrandColor/10 md:shadow p-0 md:p-14 md:rounded-3xl flex flex-col md:flex-row">
      <Image
        src={"/home_header/home_page_header_image_6.jpg"}
        height={500}
        width={500}
        alt={""}
        className="rounded-lg object-cover w-full h-full"
      />
      <div className="md:ml-10 w-11/12">
        <h3>The Experiance</h3>
        <p>
          The Sacbe training is more than just an educational course; it is a
          journey of personal and spiritual discovery. Engage in hands-on
          activities and learn transformative practices that you can carry into
          your own cacao ceremonies.
        </p>
        <h5 className="mt-5 mb-2">Experiential Learning</h5>
        <BulletPoints
          bulletPoints={[
            {
              name: "Cacao Preparation",
              effect:
                "Practical sessions in preparing and serving ceremonial cacao.",
            },
            {
              name: "Bodywork Tools",
              effect:
                "Bodywork tools and practices to enhance the cacao journey.",
            },
            {
              name: "Metaphysical Exploration",
              effect: "Exploration of cacao's metaphysical properties.",
            },
            {
              name: "Personal Development",
              effect:
                "Personal development as a cacao guardian and spiritual facilitator.",
            },
          ]}
        />
      </div>
    </section>
  );
}
