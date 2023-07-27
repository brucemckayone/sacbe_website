"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import headerImage from "/public/home_header/home_page_header_image_3.jpg";
import headerImage1 from "/public/home_header/home_page_header_image_19.jpg";
import headerImage2 from "/public/home_header/home_page_header_image_8.jpg";
const ResponsiveImageComponent: React.FC = () => {
  const [windowDimension, setWindowDimension] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowDimension(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        setWindowDimension(window.innerWidth);
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  let imageSrc = headerImage; // "/home_header/home_page_header_image_3.jpg";
  if (windowDimension && windowDimension <= 600) {
    imageSrc = headerImage1; //"/home_header/home_page_header_image_17.jpg";
  } else if (windowDimension && windowDimension <= 900) {
    imageSrc = headerImage2; // "/home_header/home_page_header_image_5.jpg";
  }

  return (
    <Image
      src={imageSrc}
      alt="branding shapes"
      priority
      fill
      placeholder="blur"
      style={{ objectPosition: "50%" }}
      className="object-cover h-screen w-screen "
    />
  );
};

export default ResponsiveImageComponent;
