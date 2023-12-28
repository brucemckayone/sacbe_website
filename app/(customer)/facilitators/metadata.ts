import homeUrl from "@/lib/constants/urls";
import { Metadata } from "next";

const facilitatorPageMetadata: Metadata = {
  abstract: "Facilitator page",
  authors: [
    {
      name: "Sacbe Cacao",
      url: homeUrl,
    },
  ],
  description: "Sacbe Cacao Facilitator page",
  keywords: [
    "Sacbe Cacao",
    "facilitator",
    "facilitators",
    "facilitator page",
    "cacao facilitors near me",
    "cacao facilitators",
    "cacao ceremony",
    "cacao ceremonies",
    "cacao ceremony near me",
    "cacao ceremonies near",
  ],
  title: "Sacbe Cacao Facilitators",
  twitter: {
    card: "summary_large_image",
    site: "@SacbeCacao",
    title: "About",
    description:
      "Sacbe Cacao Facilitator page, find sacbe approved cacao facilitators near you.",
  },
  openGraph: {
    type: "website",
    url: "https://www.sacbe-ceremonial-cacao.com/facilitators",
    title: "About",
    description:
      "Sacbe Cacao Facilitator page, find sacbe approved cacao facilitators near you.",
    siteName: "Sacbe Cacao",
  },
};

export default facilitatorPageMetadata;
