import BookingInformation from "./BookingInformation";
import TrainingTestimonial from "./TrainingTestimonial";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { TrainingHeader } from "./TrainingHeader";
// import { useRef } from "react";

export const metadata: Metadata = {
  abstract: "Sacbe Cacao Training",
  title: "Facilitator Training",
  description: "Sacbe Cacao Training",
  keywords: [
    "Sacbe Cacao Training",
    "Cacao Training",
    "Cacao",
    "Sacbe Cacao",
    "Sacbe",
    "Cacao Ceremony",
    "Cacao Ceremonies",
    "Cacao Ceremony Train",
    "Cacao Ceremony Training",
    "Cacao Training",
  ],
  category: "Sacbe Cacao Training",
  publisher: "Sacbe Cacao",
  alternates: {
    canonical: "https://sacbecacao.com/training",
  },
  creator: "Sacbe Cacao",
  twitter: {
    card: "summary_large_image",
    description: "Sacbe Cacao Training",
    title: "Sacbe Cacao Training",
    images: "https://sacbecacao.com/training",
  },
  openGraph: {
    title: "Sacbe Cacao Training",
    description: "Sacbe Cacao Training",
    url: "https://sacbecacao.com/training",
    type: "article",
    siteName: "Sacbe Cacao",
    tags: [
      "Sacbe Cacao Training",
      "Cacao Training",
      "Cacao",
      "Sacbe Cacao",
      "Sacbe",
      "Cacao Ceremony",
      "Cacao Ceremonies",
      "Cacao Ceremony Train",
      "Cacao Ceremony Training",
      "Cacao Training",
    ],
    images: [
      {
        url: "https://sacbecacao.com/training",
      },
    ],
  },
};

function TrainingPage() {
  const TrainingIntroduction = dynamic(() =>
    import("./TrainingIntroduction").then((res) => res.default)
  );

  const TrainingVenue = dynamic(() =>
    import("./TrainingVenue").then((res) => res.default)
  );
  const TrainingInformation = dynamic(() =>
    import("./TrainingInformation").then((res) => res.default)
  );

  const TrainingTheExperiance = dynamic(() =>
    import("./TrainingTheExperiance").then((res) => res.default)
  );

  return (
    <div>
      <TrainingHeader />
      <TrainingIntroduction />
      <TrainingVenue />
      <TrainingInformation />
      <TrainingTheExperiance />
      {/* @ts-expect-error Server Component */}
      <BookingInformation />
      <TrainingTestimonial />
    </div>
  );
}

export default TrainingPage;
