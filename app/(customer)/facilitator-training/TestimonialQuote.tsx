import { ImQuotesRight } from "react-icons/im";
export function TestimonialQuote(props: {
  quote: string;
  borderColor?: "black" | "white";
}) {
  return (
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
  );
}
