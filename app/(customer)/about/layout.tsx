import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about our mission, values, and the story behind our brand. Discover how we are dedicated to providing high-quality products, fostering sustainable practices, and promoting wellness. Explore our About page to understand our commitment to your well-being and the positive impact we strive to make in the world.",
  keywords: [
    "Mission",
    "Values",
    "Brand story",
    "High-quality",
    "Sustainability",
    "Wellness",
    "Commitment",

    "Vision",
    "Expertise",
    "Community",
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
