"use client";
import { TiTick } from "react-icons/ti";
import { RoomOptionType } from "./bookingSelection";

export function AvailabilityPill(props: { room: RoomOptionType }) {
  function generateStockColour() {
    if (props.room.stock < 10 && props.room.stock > 5) return "";
    else if (props.room.stock > 2 && props.room.stock < 5)
      return "bg-sacbeBrandColor/20 text-sacbeBrandColor";
    else return "bg-errorContainer/50 text-error";
  }

  return (
    <div
      className={`rounded-full self-baseline drop-shadow h-7 items-baseline mt-2 ${
        props.room.isAvailable ? "bg-recommendedGreen" : " bg-errorContainer"
      }`}
    >
      <span className="flex items-center text-xs">
        {props.room.isAvailable ? (
          <TiTick className="mx-2 text-darkGreen" />
        ) : (
          <p className="mx-2 text-error">X</p>
        )}
        {props.room.isAvailable ? (
          <p className="text-darkGreen"> Available</p>
        ) : (
          <p className="text-error">Sold Out</p>
        )}
        {props.room.isAvailable && (
          <p
            className={`text-darkGreen  border rounded-full mx-2 h-5 w-5 text-xs text-center ${generateStockColour()} `}
          >
            {" "}
            {props.room.stock}
          </p>
        )}
      </span>
    </div>
  );
}
