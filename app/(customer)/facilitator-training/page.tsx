"use client";
import React, { Suspense, useRef } from "react";
import TrainingAssistingRole from "./TrainingAssistantOption";
import { TrainingHeader } from "./TrainingHeader";
import TrainingInformation from "./TrainingInformation";
import TrainingIntroduction, { NavigationSlider } from "./TrainingIntroduction";
import TrainingTheExperiance from "./TrainingTheExperiance";
import TrainingVenue from "./TrainingVenue";
import BookingInformation from "./BookingInformation";
import TrainingTestimonials from "./TrainingTestimonials";

function TrainingPage() {
  const infoRef = useRef(null);
  const experienceRef = useRef(null);
  const venueRef = useRef(null);
  const foodRef = useRef(null);
  const bookingRef = useRef(null);
  const testRef = useRef(null);

  return (
    <div>
      <TrainingHeader />

      <div>
        <TrainingIntroduction testRef={testRef} />
      </div>
      <div ref={infoRef}>
        <TrainingInformation testRef={testRef} />
      </div>
      <div ref={experienceRef}>
        <TrainingTheExperiance />
      </div>
      <div ref={venueRef}>
        <TrainingVenue foodRef={foodRef} />
      </div>

      <div ref={testRef}>
        <TrainingTestimonials />
      </div>
      <div ref={bookingRef}>
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <BookingInformation testRef={testRef} />
        </Suspense>
      </div>
      <TrainingAssistingRole />
      <NavigationSlider
        bookingRef={bookingRef}
        experianceRef={experienceRef}
        venueRef={testRef}
        foodRef={foodRef}
        trainingRef={infoRef}
      />
    </div>
  );
}

export default TrainingPage;
