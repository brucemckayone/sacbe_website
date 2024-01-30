"use client";
import { ImQuotesRight } from "react-icons/im";
export function TestimonialQuote(props: {
  quote: string;
  borderColor?: "black" | "white";
  testRef?: React.MutableRefObject<null>;
}) {
  function scrollToRef(ref: React.RefObject<HTMLDivElement>) {
    if (ref.current) {
      const top =
        ref.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
  return (
    <div>
      <div
        className={`w-full border border-${
          props.borderColor ?? "black"
        } rounded-lg border-dashed p-2 my-2`}
      >
        <div className="flex items-center">
          <ImQuotesRight className="text-2xl mr-2 self-start h-5 w-16" />
          <p className="italic text-sm">{props.quote}</p>
        </div>
      </div>

      {props.testRef && (
        <button
          onClick={() => {
            scrollToRef(props.testRef!);
          }}
          className="ml-auto w-full text-right underline"
        >
          Read Testimonials
        </button>
      )}
    </div>
  );
}
