import { Metadata } from "next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
