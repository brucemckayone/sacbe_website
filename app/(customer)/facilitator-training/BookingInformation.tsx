"use client";
import api from "@/lib/apiSchema/apiSchema";
import { Suspense, useEffect, useState } from "react";
import AccommodationSelection, { RoomOptionType } from "./bookingSelection";

export default async function BookingInformation() {
  const [rooms, setRooms] = useState<RoomOptionType[]>([]);
  async function fetchRooms() {
    const resp = await api.training.rooms.get({
      data: {},
    });
    setRooms(resp.slice(0, 3) as RoomOptionType[]);
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  if (rooms.length === 0) return <div>Loading...</div>;

  return (
    <section className="w-11/12 mt-10  md:my-36 m-auto">
      <div className="bg-tertiaryContainer/50 rounded-xl hover:shadow-2xl duration-1000  ">
        <Suspense>
          <AccommodationSelection roomOptions={rooms} />
        </Suspense>
      </div>
    </section>
  );
}
