import { fetchRoomStock } from "@/lib/training/roomHandler";
import { Suspense } from "react";
import AccommodationSelection, { RoomOptionType } from "./bookingSelection";

export default async function BookingInformation() {
  const rooms = await fetchRoomStock();
  return (
    <section className="w-11/12 my-10 hover:mt-20 md:my-36 m-auto">
      <div className="bg-tertiaryContainer/50 rounded-xl sshadow hover:shadow-2xl duration-1000 md:hover:scale-105 ">
        <Suspense>
          <AccommodationSelection roomOptions={rooms as RoomOptionType[]} />
        </Suspense>
      </div>
    </section>
  );
}
