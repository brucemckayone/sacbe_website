"use client";
import { useSession } from "next-auth/react";
import PrimaryButton from "./primaryButton";
import Link from "next/link";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { getStripeCustomerIdByEmail } from "@/lib/firebase/getStripeCustomerId";

export default function LoginButton() {
  const { data } = useSession();

  const isLoggedIn = data != null; //data?.user?.email != null;
  return (
    <div className="m-1">
      {isLoggedIn ? (
        <button
          onClick={async () => {
            console.log(data.user?.email);

            const customerId = await fetchPostJSON(
              "api/users/get_user_id_by_email",
              {
                email: data.user?.email,
              }
            );
            console.log(customerId);

            const billingPortal = await fetchPostJSON(
              "api/stripe/billing/create_customer_portal",
              {
                customerId: customerId,
              }
            );

            window.open(billingPortal.url);
          }}
          className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2"
        >
          <h4>MANAGE ACCOUNT</h4>
        </button>
      ) : (
        <Link href={"/api/auth/signin"}>
          <button className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2">
            <h4>LOGIN</h4>
          </button>
        </Link>
      )}
    </div>
  );
}
