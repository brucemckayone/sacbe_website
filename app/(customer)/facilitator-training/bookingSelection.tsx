"use client";
import { RiskApealCards } from "@/components/customer/shared/RiskApealCards";
import { useUser } from "@/components/shared/auth/UserProvider";
import SmallLinkButton from "@/components/shared/buttons/smallLinkButton";
import { useEffect, useState } from "react";
import { CountdownTimer as EarlyBirdCountdownTimer } from "./AccomidationChoiceCard";
import JoinWaitlistButton from "./JoinWaitlistButton";
import { PackagePurchaseOption } from "./PackagePurchaseOption";

import { PayDepositButton } from "./PayDepositButton";
import { PayInFullButton } from "./PayInFullButton";
import { TestimonialQuote } from "./TestimonialQuote";

export function isEarlyBird(): boolean {
  const currentDate = new Date();
  const jan3rd = new Date(2024, 0, 31);
  return currentDate < jan3rd;
}

export type RoomOptionType = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  stock: number;
  uuid: string;
  deposit: number;
  features: string[];
};

function AccommodationSelection(props: { roomOptions: RoomOptionType[] }) {
  const { user } = useUser();
  const roomOptions = props.roomOptions;
  const [isLoading, setIsLoading] = useState(false);

  const getFirstAvailableRoom = () => {
    const firstAvailableRoom = roomOptions.find((room) => room.isAvailable);
    return firstAvailableRoom?.id;
  };
  const [selectedId, setSelectedId] = useState<string | null>(
    getFirstAvailableRoom() ?? null
  );
  const [currentRoom, setCurrentRoom] = useState<RoomOptionType>(
    roomOptions.find((room) => room.id === selectedId)!
  );

  useEffect(() => {
    const room = roomOptions.find((room) => room.id === selectedId);
    setCurrentRoom(room!);
  }, [selectedId]);

  function isAfterJan3rd(): boolean {
    const currentDate = new Date();
    const jan3rd = new Date(2024, 0, 3);
    return currentDate > jan3rd;
  }

  return (
    <div className="flex flex-col md:flex-row justify-around ">
      <div className="w-full md:w-5/12">
        <h3 className="pt-5 px-2 mb-2 text-stroke-3 text-7xl text-sacbeBrandColor">
          Invest In Yourself
        </h3>

        <div className="mx-3 ">
          <p>
            Embarking on this journey is a significant step, and we have made
            the booking process as smooth and flexible as possible. Discover the
            details below to begin your transformative experience with Sacbe
            Cacao
          </p>
          <div className="bg-onPrimary/70 mt-5 mb-10 md:mb-0 md:mt-0 border rounded-lg px-4">
            <TestimonialQuote quote="Luzura's non-judgmental listening and insightful guidance underscore the value of this training, making the investment a gateway to personal and spiritual growth." />

            <SmallLinkButton
              link="https://calendly.com/thirdeyetribe/discovery-call-20mins"
              text="Book A Discovery Call"
              className="w-full"
              isPrimary={false}
            />

            <p className="text-xs mb-10 ">
              If you are unsure or need more info we offer a free 20 minute
              discovery call, where we can answer any questions you may have.
            </p>
          </div>
          <div className="hidden md:block">
            <RiskApealCards
              isHorizontal={false}
              customKlarnaText={`Pay Deposit in 3 Installments of £${(
                roomOptions[0].deposit / 3
              ).toFixed(2)}`}
              howMuchIsDonatedToClimateChange={currentRoom?.price ?? 1 / 100}
            />
          </div>
          <EarlyBirdCountdownTimer />
        </div>
      </div>

      <div className="w-11/12 m-auto md:w-5/12 flex flex-col justify-center">
        <PackagePurchaseOption
          roomOptions={roomOptions}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        {isAfterJan3rd() ? (
          <JoinWaitlistButton />
        ) : (
          <>
            <PayInFullButton
              customerId={user.customerId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              currentRoom={currentRoom}
            />
            <PayDepositButton
              customerId={user.customerId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              currentRoom={currentRoom}
            />
          </>
        )}
        <div className="md:hidden">
          <RiskApealCards
            isHorizontal={false}
            customKlarnaText={`Pay Deposit in 3 Installments of £${(
              roomOptions[0].deposit / 3
            ).toFixed(2)}`}
            howMuchIsDonatedToClimateChange={currentRoom?.price ?? 1 / 100}
          />
        </div>
      </div>
    </div>
  );
}

export default AccommodationSelection;
