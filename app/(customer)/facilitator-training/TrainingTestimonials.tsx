"use client";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";

interface Testimonial {
  name: string;
  quote: string;
  image: string;
  subName?: string;
}

export default function TrainingTestimonials() {
  const slides: Testimonial[] = [
    {
      name: "Fiona Boyd",

      quote:
        "I've worked with Luzura for a few years now both in circles and for 1:1 guidance and I'm always struck by how they listen to exactly what I need to share without judgement. Luzura's passion and wisdom is the heart of everything they do and makes me feel supported, safely guided and surrounded by love and support every time. I recently completed a 6 day Cacao Facilitor Training where Luzura was one of the facilitators and being in space with them for that time was inspiring, uplifting and revelationary. The compassion, love and guidance they showered me with during that time will forever live in my heart.",
      image: "/facilitators/fiona.png",
    },
    {
      name: "Luilfr Wilde",
      subName: "",
      quote:
        "This training was one of the greatest gifts I gave myself. From the moment of arrival the focus was on each of us feeling empowered and held. I wasn’t expecting the depth of healing and wholeness I’d return home with, and I’m still in touch with the beautiful souls I met there. I was already an Elemental practitioner before arriving, but having freedom to strengthen my practice was invaluable. A true adventure of discovery. From crying together, laughter while sharing incredible food, and letting my vitality roar while naked in a river. I could not recommend this training enough. There’s a focus on indigenous importance as well as practical knowledge, and I left with full confidence in myself as a guardian of Cacao.",
      image: "/facilitators/lilfur.jpeg",
    },
    {
      name: "Susan Findlay",
      subName: "@journeytoheka",
      quote:
        "I joined Luzura for the Cacao & Elemental Facilitator training in October 2024 and I feel that I received everything that I needed and more. The course really exceeded my expectations and I went away feeling fully equipped to step into my new role as a Cacao Facilitator and guardian of this sacred medicine. Luzura has a wealth of knowledge on the Maya people and their ancient calender, rituals and traditions. I felt that they really honoured their lineage and delivered this course as a true wisdom keeper. Luzura's teaching style is both multifaceted and fluid and they created a very unique learning environment. I'm sure that I will be a student to Luzura for many years to come.",
      image: "/facilitators/SUSANFINALS-14.jpg",
    },
    {
      name: "Steph Harkin",
      subName: "@journeytoheka",
      quote:
        "What an incredible journey it was to be part of Luzura Cacao Facilitator Training. It was more than this, it was as much a personal rite of passage into Self as it was learning the medicine of Cacao and the elements. This was packed to the brim of embodiment practices, teachings and guidance from Luzura. Luzura is a dream to watch and their devotion is exemplified in everything they do.  This was a full mind, body, soul experience; one not to be missed.",
      image: "/facilitators/steph.jpg",
    },
    {
      name: "Amelia Pace",
      subName: "@ameliaj.pace",
      quote:
        "This training was the best gift to myself which I now share with others too! It was the most divine, sacred, healing week!! Highly recommend ❤️❤️❤️",
      image: "/facilitators/amelia.png",
    },
  ];

  return (
    <div>
      <Carousel
        dragFree
        breakpoints={[
          { maxWidth: 640, slideSize: "90%" },
          { maxWidth: 1024, slideSize: "60%" },
          { maxWidth: 1324, slideSize: "60%" },
          { maxWidth: 2000, slideSize: "37%" },
        ]}
        slideGap="md"
        initialSlide={1}
        className="w-full rounded-xl overflow-hidden mt-20"
        withIndicators={false}
        withControls={false}
      >
        {slides.map((slide) => {
          return (
            <Carousel.Slide key={slide.quote}>
              <div className="w-full p-5 rounded-3xl border-2 border-dashed border-black md:h-[500px] lg:h-96">
                <div className="flex">
                  <Image
                    src={slide.image}
                    alt={""}
                    width={70}
                    height={70}
                    className="rounded-full h-16 w-16 object-cover"
                  />
                  <div className="ml-5">
                    <h4>{slide.name}</h4>
                    {slide.subName && (
                      <h5 className="text-sm">{slide.subName}</h5>
                    )}
                  </div>
                </div>
                <p>{slide.quote}</p>
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}
