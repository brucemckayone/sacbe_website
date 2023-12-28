"use client";
import createCheckoutSession from "@/lib/stripe/checkout/createCheckoutSession";
import testSwitch from "@/utils/test/TestSwitch";
import { usePathname } from "next/navigation";
import { useContext, useState, useRef, useEffect } from "react";
import { useUser } from "../auth/UserProvider";
import PrimaryButton from "./primaryButton";
import { SearchContext } from "../../providers/AffiliatePaymentLinkProvider";
import { getOneTimeId } from "@/lib/constants/stripe/productids";

export function markFirstTimeBuyer() {
  if (typeof localStorage === "undefined") {
    return;
  }
  localStorage.setItem("firstTimeOfferPurchased", "true");
}

export function RawUnlockOfferButton() {
  const [show, setShow] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { oneofflink, sublink } = useContext(SearchContext);
  const pathname = usePathname();

  useEffect(() => {
    function updateScrollPosition() {
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      const halfwayPoint = pageHeight / 3;
      const scrollPosition = window.scrollY || window.pageYOffset;

      if (scrollPosition >= halfwayPoint) {
        // Perform your action here
        if (!buttonHasBeenClicked()) {
          // Check if the button has been clicked before
          setShow(true);

          // Scroll the button into view
          if (buttonRef.current) {
            buttonRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
    window.addEventListener("scroll", updateScrollPosition);
    updateScrollPosition();
    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  if ((!oneofflink || !sublink) && !isRestrictedPathname(pathname as string)) {
    if (!buttonHasBeenClicked()) {
      return (
        <div
          ref={buttonRef}
          className={`${show ? "animate-slide_in_left_fade" : "hidden"}`}
        >
          <PrimaryButton
            onClicked={handleCicked}
            text={isLoading ? "Loading" : "15% Offer"}
            isPrimary
            className="self-center text-center ml-1 mt-1"
          />
        </div>
      );
    } else {
      return null; // Don't show the button if it has been clicked before
    }
  } else {
    return <></>;
  }

  // Function to check if the button has been clicked before
  function buttonHasBeenClicked() {
    if (typeof localStorage === "undefined") {
      return false;
    }
    return localStorage.getItem("firstTimeOfferPurchased") === "true";
  }

  async function handleCicked() {
    setIsLoading(true);
    await createCheckoutSession({
      prices: getOneTimeId() as string[],
      mode: "payment",
      customerId: user.customerId ?? undefined,
      qty: 1,
      discountCode: testSwitch({ live: "wIrTDDDg", test: "aqhZ2D8k" }),
    });
    setIsLoading(false);
  }
}
function isRestrictedPathname(pathname: string): boolean {
  return (
    pathname.includes("wholesale") ||
    pathname.includes("signin") ||
    pathname.includes("portal") ||
    pathname.includes("auth")
  );
}
