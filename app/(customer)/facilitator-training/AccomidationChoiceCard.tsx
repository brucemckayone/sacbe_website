"use client";
import { useEffect, useState } from "react";
import { AvailabilityPill } from "./AvailabilityPill";
import { isEarlyBird, RoomOptionType } from "./bookingSelection";

export function AccomidationChoiceCard(props: {
  handleSelect: (arg0: any) => void;
  room: RoomOptionType;
  selectedId: any;
}) {
  return (
    <div
      onClick={() => props.handleSelect(props.room.id)}
      className={`border rounded-xl  shadow duration-500 border-sacbeBrandColor/60 p-5 w-full m-auto md:w-full md:mx-2 my-2 md:px-2 ${
        props.selectedId == props.room.id
          ? "bg-sacbeBrandColor/10 shadow-xl scale-105"
          : ` ${
              props.room.isAvailable ? "bg-onPrimary" : " bg-onErrorContainer"
            }"}}`
      }`}
    >
      <div className="flex justify-between md:w-11/12 m-auto">
        <h5>{props.room.name}</h5>
        <AvailabilityPill room={props.room} />
      </div>
      <div className=" w-11/12 m-auto border-b border-sacbeBrandColor/70 my-5" />
      <ul className="list-disc text-sm list-inside md:w-11/12 m-auto">
        {props.room.features.map((e) => {
          return <li key={e}>{e}</li>;
        })}
      </ul>

      <div className={`flex w-full mt-4 md:mt-0 justify-end`}>
        <div className="text-end ">
          {isEarlyBird() ? (
            <div className="">
              <p className="text-sm md:text-lg flex justify-end">
                Early Bird:{" "}
                <span className="font-bold ml-1">
                  {" "}
                  £{props.room.price - 200}
                </span>
              </p>
              <p className="text-xs md:text-sm">save £200</p>
            </div>
          ) : (
            <p className="text-sm md:text-lg">£{props.room.price}</p>
          )}
          <div className="border-b border-black/40 mt-2 w-10/12 flex ml-auto" />
          <p className="text-xs"> min deposit: £{props.room.deposit}</p>
        </div>
      </div>
    </div>
  );
}

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export const EarlyBirdCountdownTimer = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date("2024-01-31") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents = (Object.keys(timeLeft) as Array<keyof TimeLeft>)
    .filter((key) => timeLeft[key] !== undefined)
    .map((key) => (
      <div key={key} className="flex flex-col items-center">
        <div className=" text-sm  font-bold transition-transform transform duration-500 ease-out">
          {timeLeft[key]}
        </div>
        <div className="text-sm uppercase">{key}</div>
      </div>
    ));

  return (
    <div className="flex-col md:flex-row justify-between bg-recommendedGreen border md:border-none md:bg-transparent p-2 md:p-0 rounded-2xl shadow-lg md:shadow-none my-10">
      <h4 className="md:mt-3">Early Bird Discount: </h4>
      <div className=" flex p-2 rounded-2xl space-x-3 md:bg-recommendedGreen/40 md:border">
        {timeComponents}
      </div>
    </div>
  );
};

export { EarlyBirdCountdownTimer as CountdownTimer };
