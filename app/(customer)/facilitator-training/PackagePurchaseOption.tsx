"use client";
import toast from "react-hot-toast";
import { AccomidationChoiceCard } from "./AccomidationChoiceCard";
import { isEarlyBird, RoomOptionType } from "./bookingSelection";

export function PackagePurchaseOption(props: {
  roomOptions: any[];
  setSelectedId: (arg0: string) => void;

  selectedId: any;
}) {
  const handleSelect = (id: string) => {
    const room = props.roomOptions.find(
      (room: RoomOptionType) => room.id === id
    );
    if (room?.isAvailable) {
      props.setSelectedId(id);
    } else {
      toast.error("This room is not available");
    }
  };

  return (
    <div className="">
      <h4 className="pl-3">Choose Accommodation</h4>
      <div className="flex flex-col ">
        {props.roomOptions.map((room) => (
          <AccomidationChoiceCard
            key={room.id}
            selectedId={props.selectedId}
            handleSelect={handleSelect}
            room={room}
          />
        ))}
      </div>
    </div>
  );
}
