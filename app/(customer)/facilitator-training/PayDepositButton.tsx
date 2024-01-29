"use client";
import api from "@/lib/apiSchema/apiSchema";
import { Modal, Slider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { isEarlyBird, RoomOptionType } from "./bookingSelection";

function IntroductionMessage(props: {
  currentRoom: RoomOptionType;
  startDate: string;
  price: number;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold">
        {" "}
        {props.currentRoom?.name} - £{props.price}
      </h2>
      <p className="text-sm ">
        Set up how you would like to pay,{" "}
        <span className="font-bold">
          {" "}
          you will only be charged a deposit now{" "}
        </span>{" "}
        . your custom payment plan will start on:{" "}
        <span className="text-bold border rounded px-2">
          {" "}
          {props.startDate}
        </span>
      </p>
    </div>
  );
}

function PlanSliders(props: {
  duration: number;
  setDuration: (arg0: number) => void;
  amount: string;
  setAmount: (arg0: number) => void;
}) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const monthsLeft = 8 - currentMonth;
  return (
    <div className="p-2 bg-tertiaryContainer rounded-lg  my-5">
      <div className=" rounded-xl bg-onPrimary drop-shadow p-2 mb-2">
        <h5>Choose Payment Plan Duration</h5>
        <div className="">
          <Slider
            min={3}
            max={monthsLeft - 1}
            step={1}
            value={props.duration}
            onChange={(value) => props.setDuration(value)}
          />
          <div className="text-end items-end">{props.duration} month</div>
        </div>
      </div>
      <div className="rounded-xl bg-onPrimary drop-shadow p-2">
        <h5>Choose Deposit Amount</h5>
        <div className="">
          <Slider
            min={500}
            max={1500}
            step={10}
            value={parseInt(props.amount)}
            onChange={(value) => props.setAmount(value)}
          />
          <div className="text-end items-end">Deposit: £{props.amount} </div>
        </div>
      </div>
    </div>
  );
}

function PlanSummary(props: {
  depositAmount: string;
  monthlyCost: string;
  startDate: string;
  endDate: string;
}) {
  return (
    <div>
      <div className="p-2 rounded-lg border  my-2">
        <h5>My Deposit</h5>
        <p>Pay Now: £{props.depositAmount}</p>
      </div>
      <div className="p-2 rounded-lg border  my-2">
        <h5>My Plan</h5>
        <p>Monthly: £{props.monthlyCost} per month</p>
        <div className="border-b w-11/12 m-auto my-5 border-sacbeBrandColor"></div>
        Starting:
        <span className="text-bold border rounded px-2 ml-2">
          {props.startDate} <br />
        </span>
        Ending:
        <span className="text-bold border rounded px-2 ml-4">
          {props.endDate}
          <br />
        </span>
      </div>
    </div>
  );
}

export function PayDepositButton(props: {
  setIsLoading: (arg0: boolean) => void;
  customerId: any;
  currentRoom?: RoomOptionType;
  isLoading: any;
}) {
  const [duration, setDuration] = useState(3);
  const [amount, setAmount] = useState(500);
  const [opened, { open, close }] = useDisclosure(false);

  const startDate = new Date(
    new Date().setMonth(new Date().getMonth() + 1)
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const endDate = new Date(
    new Date().setMonth(new Date().getMonth() + duration + 1)
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const monthlyCost = (
    (isEarlyBird()
      ? props.currentRoom!.price - 200 - amount
      : props.currentRoom!.price - amount) / duration
  ).toFixed(2);

  const depositAmount = amount.toFixed(2);

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Customize Your Plan ">
        <IntroductionMessage
          currentRoom={props.currentRoom!}
          startDate={startDate}
          price={
            isEarlyBird()
              ? props.currentRoom!.price - 200
              : props.currentRoom!.price
          }
        />
        <PlanSummary
          startDate={startDate}
          endDate={endDate}
          monthlyCost={monthlyCost}
          depositAmount={depositAmount}
        />
        <PlanSliders
          duration={duration}
          setDuration={setDuration}
          amount={depositAmount}
          setAmount={setAmount}
        />
        <button
          onClick={async () => {
            try {
              props.setIsLoading(true);
              const checkout = await api.stripe.checkout.custom.post({
                data: {
                  customerId: props.customerId,
                  price:
                    (isEarlyBird()
                      ? props.currentRoom!.price - 200
                      : props.currentRoom!.price) * 100,
                  deposit: parseInt(depositAmount) * 100,
                  duration: duration,
                  metaData: {
                    roomType: props.currentRoom?.uuid,
                    duration: duration + 1,
                  },
                  hasShipping: false,
                  hasCustomerNotes: props.currentRoom?.uuid == "doublePrivate",
                },
              });
              location.href = checkout.data.url;
              props.setIsLoading(false);
            } catch (error) {
              toast.error("There was an error processing your request");
              console.error(error);

              props.setIsLoading(false);
            }
          }}
          className="py-2 px-6  bg-sacbeBrandColor/70 font-semibold rounded-lg shadow-md col-span-full w-full"
        >
          {props.isLoading ? "Loading..." : "Pay Deposit"}
        </button>
      </Modal>
      <button
        onClick={open}
        className="py-2 px-6  font-semibold bg-white rounded-lg shadow-md col-span-full w-full"
      >
        {props.isLoading ? "Loading..." : "I'm all in, customize payment plan "}
      </button>

      <p className="text-xs mt-5 text-center">Deposits are non-refundable</p>
    </div>
  );
}
