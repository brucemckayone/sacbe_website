import { BulletPoints } from "./BulletPoints";
import Image from "next/image";
export default function TrainingTheExperiance() {
  return (
    <section className="w-11/12 m-auto my-10 md:my-36 py-10 md:px-2 justify-between flex flex-col md:flex-row x-2 md:bg-secondaryContainer/30 md:shadow md:rounded-3xl">
      <div className="w-full md:w-6/12 md:mx-10  ">
        <Image
          src={"/training/previous/1.jpeg"}
          height={500}
          width={500}
          alt={
            "An Image of the showing the experiance of going to the training"
          }
          className="rounded-lg object-cover w-full md:h-[890px]"
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
              name: "Rising Rituals",
              effect:
                " Each day will begin with a two hour devotional practice with Cacao, meditation, prayer, breath, movement, somatic experiencing, vocal toning + embodiment work. ",
            },
            {
              name: "Attunement",
              effect:
                "Experience opening + closing ceremonies with Cacao, Ecstatic Dance, Sound therapy, Group energy healing, and Elemental rituals to support your own wellbeing, healing and empowerment.",
            },
            {
              name: "Bodywork",
              effect:
                "Learn neuro-somatic tools to bridge the body and brain, safe ways to support big emotional releases, and simple effective science backed techniques for emotional empowerment and improving nervous system health.",
            },
            {
              name: "Metaphysical Exploration",
              effect:
                "Understanding heart consciousness, plant consciousness and communicating with plants.",
            },
            {
              name: "Continuing Development",
              effect:
                "3 months integration support post in-person training, including guidance on  facilitator self care, how to market your offerings in an aligned way, ways to continue practising reciprocity and responsibility and opportunities to facilitate 1:1 + group journeys with Cacao and receive feedback. Additionally, you will receive free entry to monthly online Cacao Circles with Luzura from the moment you sign up and beyond completion of your training.",
            },
            {
              name: "Handpoke Tattoo",
              effect:
                "Option to receive a ceremonial hand poke tattoo from Luzura. A sacred marking to seal and honour your devotion to the medicine of Cacao + Path of the heart.",
            },
          ]}
        />
      </div>
    </section>
  );
}
