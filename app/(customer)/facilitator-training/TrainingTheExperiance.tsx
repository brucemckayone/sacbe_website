import { BulletPoints } from "./BulletPoints";
import Image from "next/image";
export default function TrainingTheExperiance() {
  return (
    <section className="w-11/12 m-auto my-10 md:my-36 py-10 md:px-2 justify-between flex flex-col md:flex-row x-2 md:bg-secondaryContainer/30 md:shadow md:rounded-3xl">
      <div className="w-full md:w-6/12 md:mx-10  ">
        <Image
          src={"/home_header/home_page_header_image_6.jpg"}
          height={500}
          width={500}
          alt={
            "An Image of the showing the experiance of going to the training"
          }
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      <div className="w-11/12 md:w-6/12 md:mr-10">
        <h3 className="mt-5 md:mt-0">The Experiance</h3>
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
