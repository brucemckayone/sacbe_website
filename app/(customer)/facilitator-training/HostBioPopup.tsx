"use client";

import Image from "next/image";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SocialContactPill } from "../facilitators/SocialContactPill";
import Link from "next/link";
function HostBioPopup() {
  const [open, { toggle, close }] = useDisclosure();
  return (
    <>
      <button
        className="w-full border my-5 p-2 bg-white hover:bg-black hover:text-white duration-500 rounded-lg shadow"
        onClick={toggle}
      >
        LEARN ABOUT HOST
      </button>
      <Modal opened={open} onClose={close} size={900} className="m-0">
        <div className="p-5 rounded-xl shadow-2xl ">
          <Image
            src={"/training/host/2.jpeg"}
            height={100}
            width={1000}
            className="rounded-lg object-cover w-full h-full"
            alt="An image of Luzura Peralta working with cacao"
          />
          <h2 className="mt-5">Luzura Peralta</h2>
          <div className="flex flex-col space-y-2 md:flex-row items-start justify-between spacing-x-5 md:items-center my-2 rounded-xl bg-white border shadow p-3">
            <div className="flex items-center">
              <p>Business: </p>
              <Link
                className=" ml-1 mr-5 border p-1 px-2 rounded shadow"
                href={"https://www.instagram.com/thirdeyetribe__"}
              >
                @thirdeyetribe__
              </Link>
            </div>
            <div className="flex items-center">
              <p>Personal: </p>
              <Link
                className=" ml-1.5 mr-5 border p-1 px-2 rounded shadow"
                href={"https://www.instagram.com/iamluzuraperalta"}
              >
                @iamluzuraperalta
              </Link>
            </div>
            <div className="flex items-center">
              <p>Website: </p>
              <Link
                className=" ml-3 mr-5 border p-1 px-2 rounded shadow"
                href={"https://www.thirdeyetribe.co.uk"}
              >
                Third Eye
              </Link>
            </div>
          </div>
          <p className="mt-5">
            Luzura (they /them) is a Somatic Spiritual Guide + Healer of Latino
            Celtic descent. They are the founding director of Sacbe Ceremonial
            Cacao, set up in 2020 after developing a relationship with sacred
            Cacao during 2017 whilst living in Mexico.
          </p>
          <p className="mt-5">
            They continued working with the medicine upon returning to the north
            east coast of Scotland, by creating their own personal rituals, and
            working with Cacao to support their integration from a medicine
            ceremony with Bufo (5-Meo-DMT) shortly prior to departing Mexico. In
            2018, they started gathering with small groups of people to guide
            journeys with Cacao.
          </p>
          <p className="mt-5">
            Fast forward 7 years to 2024, they can currently be found offering
            private group + 1:1 medicine journeys, ceremonial hand poke tattoos,
            Mayan healing rituals, facilitator trainings + retreats in the UK,
            Europe + Mexico.
          </p>
          <p className="mt-5">
            Luzura offers intuitive pathways to apply ancient wisdom to our
            modern day lives, showing how we can adopt a contemporary animistic
            lens to plug in and connect to the greater web of life. Their
            teachings invite us to lean in to ask the deeper questions, listen
            more attentively + seek to explore how we can be in highest service
            to ourselves + our communities through upholding integrity,
            reciprocity, honour and truth
          </p>
          <p className="mt-5">
            They are a student Curandera/o of Traditional Mayan Medicine;
            following the ancestral shamanic traditions of Mesoamerica + South
            America under the guidance of elder (abeula) Sofia Hernandez of the
            Totzil peoples of Chiapas, Mexico. They are a keeper of sacred Maya
            time (Known as Chol Q&apos;ij in Ki&apos;che Maya + Tzolk&apos;in in
            Yucatec Maya) ) which informs their personal practice + how they
            conduct the ceremonial space, as a way of honouring the lineage +
            wisdom keepers of Cacao.
          </p>
          <p className="mt-5">
            They bring a rooted sense of embodied wisdom to their work; adopting
            a holistic approach to wholeness (healing) + belonging, trauma
            resolution + nervous system rehabilitation as a ICF accredited
            Neuro-Somatic Coach. Holding a BA in Dance + Professional Practice,
            with over 20 years experience in various movement, somatic, sound +
            energy healing modalities, they intuitively weave what is needed
            into the landscape of their offerings.
          </p>
          <p className="mt-5">
            Luzura’s Path is in devotion to dissolving the structures of
            separation and oppression; advocating for ecological harmony, unity
            & freedom for all beings on Earth.
          </p>
        </div>
      </Modal>
    </>
  );
}

export default HostBioPopup;
