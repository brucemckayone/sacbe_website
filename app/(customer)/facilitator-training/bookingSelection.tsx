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
 * @returns {boolean} True if the current date is before January 3rd, 2024; otherwise, false.
 */
export function isEarlyBird(): boolean {
  const currentDate = new Date();
  const jan31st = new Date(2024, 0, 31);
  return currentDate < jan31st;
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

export function isAfterJan3rd530(): boolean {
  const currentDate = new Date();
  const jan3rd = new Date(2024, 0, 3, 5, 30, 0, 0);
  return currentDate > jan3rd;
}

function AccommodationSelection(props: {
  roomOptions: RoomOptionType[];
  testRef: React.MutableRefObject<null>;
}) {
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
        <h3 className="pt-5 px-2 mb-1 text-stroke-3 text-[45px] leading-10 md:text-7xl text-sacbeBrandColor">
          Leadership for Earth&apos;s Awakening
        </h3>
        <h4 className=" px-3"> An Initiation to the Path of Cacao</h4>

        <div className="mx-3 ">
          <p className="mb-3">
            Our shamanic oriented training is for those individuals who are
            already in deep relationship with Cacao. And who are ready to truly
            take on these teachings with reverence in service to our collective
            transformation on Earth.
          </p>
          <p>
            Embarking on this journey is a significant step, and so we have
            aimed to make the enrolment process as smooth and flexible as
            possible. Discover our self adjusting deposit and payment options
            below and enjoy an early bird saving of £200 until January 31st.
          </p>
          <div className="bg-onPrimary/70 mt-5 mb-10 md:mb-0 md:mt-0 border rounded-lg px-4">
            <TestimonialQuote
              testRef={props.testRef}
              quote="Luzura's non-judgmental listening and insightful guidance underscore the value of this training, making the investment a gateway to personal and spiritual growth."
            />

            <SmallLinkButton
              link="https://calendly.com/thirdeyetribe/discovery-call-20mins"
              text="Book A Discovery Call"
              className="w-full"
              isPrimary={false}
            />

            <p className="text-xs mb-10 ">
              If you are unsure or need more info we offer a free 20 minute
              discovery call with Luzura, where they can answer any questions
              you may have.
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
          <div className="my-5">
            <EarlyBirdCountdownTimer isDark={false} />
          </div>
        </div>
      </div>

      <div className="w-11/12 m-auto md:w-5/12 flex flex-col justify-center">
        <PackagePurchaseOption
          roomOptions={roomOptions}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        {!isAfterJan3rd530() ? (
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
