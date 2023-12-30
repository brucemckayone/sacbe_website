"use client";
import React, { Suspense, useRef } from "react";
import TrainingAssistingRole from "./TrainingAssistantOption";
import { TrainingHeader } from "./TrainingHeader";
import TrainingInformation from "./TrainingInformation";
import TrainingIntroduction from "./TrainingIntroduction";
import TrainingTheExperiance from "./TrainingTheExperiance";
import TrainingVenue from "./TrainingVenue";
import BookingInformation from "./BookingInformation";
// ... other imports ...

function TrainingPage() {
  const infoRef = useRef(null);
  const experienceRef = useRef(null);
  const venueRef = useRef(null);
  const foodRef = useRef(null);
  const bookingRef = useRef(null);

  return (
    <div>
      <TrainingHeader />
      <div>
        <TrainingIntroduction
          venueRef={venueRef}
          foodRef={foodRef}
          experianceRef={experienceRef}
          trainingRef={infoRef}
          bookingRef={bookingRef}
        />
      </div>
      <div ref={infoRef}>
        <TrainingInformation />
      </div>
      <div ref={experienceRef}>
        <TrainingTheExperiance />
      </div>
      <div ref={venueRef}>
        <TrainingVenue foodRef={foodRef} />
      </div>
      <div ref={bookingRef}>
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <BookingInformation />
        </Suspense>
      </div>
      <TrainingAssistingRole />
    </div>
  );
}

export default TrainingPage;
