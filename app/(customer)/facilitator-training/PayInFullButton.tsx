"use client";
import api from "@/lib/apiSchema/apiSchema";
import toast from "react-hot-toast";

export function PayInFullButton(props: {
  setIsLoading: (arg0: boolean) => void;
  customerId: any;
  currentRoom?: { id: string; uuid: any };
  isLoading: any;
}) {
  return (
    <button
      onClick={async () => {
        try {
          props.setIsLoading(true);
          const checkout = await api.stripe.checkout.post({
            data: {
              customerId: props.customerId,
              mode: "payment",
              prices: [props.currentRoom?.id!],
              qty: 1,
              discount: "RtQp0C00",
              metaData: {
                roomType: props.currentRoom?.uuid,
              },
              hasShipping: false,
              hasReferalFeild: true,
            },
          });
          location.href = checkout.data.url;
          props.setIsLoading(false);
        } catch (error) {
          toast.error("There was an error processing your request");
          props.setIsLoading(false);
        }
      }}
      className=" py-2 px-6 bg-sacbeBrandColor/80 my-4 rounded-lg shadow-md font-bold border col-span-full w-full"
    >
      {props.isLoading ? "Loading..." : "I'm all in, Pay In Full"}
    </button>
  );
}
