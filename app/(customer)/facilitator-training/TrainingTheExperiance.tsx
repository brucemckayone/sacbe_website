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
        <h3 className="mb-5 h-3 mt-5 md:mt-0">The Experience</h3>
        <p>
          You will be guided to discover your own way of holding space;
          exploring inspiration over imitation. This is much more than training.
          It is an initiation into a Path of devotional service in alliance with
          Cacao.
        </p>
        <h5 className="mt-5 mb-2">Embodied Learning</h5>
        <BulletPoints
          bulletPoints={[
            {
              name: "Cacao Study",
              effect:
                "Practical sessions in preparing and serving ceremonial cacao. and history. To practical information about dosing, contradictions, and conversations on cultural appropriation",
            },
            {
              name: "Bodywork",
              effect:
                "Learn neuro-somatic tools to bridge the body and brain, safe ways to support big emotional releases, and simple effective science backed tools for emotional empowerment and improving nervous system health.",
            },
            {
              name: "Metaphysical Exploration",
              effect:
                "Understanding heart consciousness, plant consciousness and communicating with plants.",
            },
            {
              name: "Continuing Development",
              effect:
                "months integration support post in-person training, plus opportunities to facilitate 1:1 + group journeys with Cacao and receive feedback",
            },
          ]}
        />
      </div>
    </section>
  );
}
