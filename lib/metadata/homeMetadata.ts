import { Metadata } from "next";
const metaDescription =
  "Explore Sacbe's premium ceremonial cacao: a journey of rich flavors and ancient traditions. Delve into our curated cacao blends, recipes, and insightful blogs. Available in the UK.";
export const homeMetaData: Metadata = {
  title: {
    default: "Sacbe Ecuadorian Ceremonial Cacao",
    template: "%s | Sacbe Cacao",
  },
  applicationName: "Sacbe Cacao",
  metadataBase: new URL("https://www.sacbe-ceremonial-cacao.com"),
  category: "Cacao",
  alternates: {
    canonical: "https://www.sacbe-ceremonial-cacao.com",
  },
  keywords: [
    "Ceremonial cacao",
    "Transformative experiences",
    "What is Cacao",
    "Sustainable sourcing",
    "Cacao ceremony",
    "Connection",
    "Health and wellness",
    "Athletic Preformance",
    "Mental health",
    "Nourishment",
    "Recipes",
    "Keto",
    "Super Food",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  colorScheme: "light",
  twitter: {
    title: {
      default: "Sacbe Cacao",
      template: "%s | Sacbe Cacao",
    },
    description: metaDescription,
    site: "https://sacbe-ceremonial-cacao.com",
  },

  description: metaDescription,
  openGraph: {
    title: {
      default: "Sacbe Cacao",
      template: "%s | Sacbe Cacao",
    },
    description: metaDescription,
    siteName: "Sacbe Cacao",
    url: "https://www.sacbe-ceremonial-cacao.com",
    locale: "en_GB",
    type: "website",
    countryName: "United Kingdom",
  },
};
