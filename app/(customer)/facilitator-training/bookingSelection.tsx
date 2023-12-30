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

/**
 * Checks if the current date is before January 3rd, 2024.
 * @returns {boolean} Returns true if the current date is before January 3rd, 2024; otherwise, returns false.
 */
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

export function isAfterJan3rd(): boolean {
  const currentDate = new Date();
  const jan3rd = new Date(2024, 0, 3);
  return currentDate > jan3rd;
}

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

  return (
    <div className="flex flex-col md:flex-row justify-around ">
      <div className="w-full md:w-5/12 md:ml-10">
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
            <div className="flex flex-row  p-2 rounded-xl drop-shadow-lg bg-surface mt-5 ">
              <p className="text-sm">
                A percentage of the total profits will be divided between
                indigenous + earth supporting organisations in Ecuador, Mexico +
                Guatemala. By purchasing this training, you are supporting the
                lineage of Cacao & the ancient wisdom ways of the people.
              </p>
            </div>
            <RiskApealCards
              isHorizontal={false}
              show={{
                flexiblePayments: false,
                earthPledge: true,
                fairTrade: true,
              }}
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
        {!isAfterJan3rd() ? (
          <div className="my-5 m-auto w-10/12">
            <JoinWaitlistButton />
          </div>
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
            <p
              className="underline text-center cursor-pointer text-xs mb-5 p-2 bg-white rounded-lg shadow-md w-full md:w-1/2 m-auto"
              onClick={() => {
                scrollBy({ top: 1200, behavior: "smooth" });
              }}
            >
              Discounted Assistant Role Available
            </p>
          </>
        )}

        <div className="md:hidden">
          <div className="flex flex-row  p-2 rounded-xl drop-shadow-lg bg-surface mt-5 ">
            <p className="text-sm">
              A percentage of the total profits will be divided between
              indigenous + earth supporting organisations in Ecuador, Mexico +
              Guatemala. By purchasing this training, you are supporting the
              lineage of Cacao & the ancient wisdom ways of the people.
            </p>
          </div>
          <RiskApealCards
            isHorizontal={false}
            show={{
              flexiblePayments: false,
              earthPledge: true,
              fairTrade: true,
            }}
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
