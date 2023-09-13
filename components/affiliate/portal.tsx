"use client";

import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";
import PaymentLinks from "./paymentLinks";
import { useUser } from "@/components/auth/affiliate_auth_context";
import { useSession } from "next-auth/react";
import PrimaryButton from "../buttons/primaryButton";
import TextInput from "../form/inputs/TextInput";
import { useEffect, useState } from "react";
import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { Spinner } from "../loaders/Spinner";
import toast from "react-hot-toast";

function Portal() {
  const { user: affiliate, isLoading: affiliateLoading, setUser } = useUser();

  const session = useSession();

  console.log(affiliate);
  if (session!.data?.user) {
    // set loading state
    if (affiliateLoading) {
      return (
        <div>
          <h6>Loading Affiliate Details</h6>
        </div>
      );
    } else {
      return (
        <span>
          <div className=" md:w-10/12 m-auto">
            <span className="flex flex-col md:flex-row justify-between">
              <h1 className="mt-10 w-full md:w-2/6">Affiliate Portal</h1>
              <span className="w-full md:w-4/6">
                <AccountBalanceTabs />
              </span>
            </span>
            <CouponFeild affiliate={affiliate} setUser={setUser} />
            <PaymentLinks />

            <SetUpAccountButton />
          </div>
        </span>
      );
    }
  }
  return <> </>;
}

interface ICouponFeild {
  affiliate: userType;
  setUser: (user: userType) => void;
}

const CouponFeild = ({ affiliate, setUser }: ICouponFeild) => {
  const [couponName, setCouponName] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isCouponSet, setIsCouponSet] = useState(false);

  const handleCouponChange = (newValue: string) => {
    setIsFetching(true);
    setCouponName(newValue.toUpperCase());
  };

  useEffect(() => {
    const asyncFunction = async () => {
      if (!isFetching && couponName.length > 2) {
        const exists = !(await fetchGetJSON(
          `/api/affiliate/coupon?coupon=${couponName}&validate=true`
        ));
        setIsValidName(exists && couponName.length >= 4);
        console.log(exists);
      }
    };
    asyncFunction();
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  }, [couponName, handleCouponChange]);

  if (affiliate.coupon || isCouponSet)
    return (
      <div className="mb-10 mx-2 md:w-1/5">
        <h5>Your coupon is:</h5>
        <div className="border rounded-lg drop-shadow-sm p-2  mt-1">
          <h5>
            {isCouponSet && !affiliate.coupon
              ? couponName.toUpperCase()
              : affiliate.coupon?.toUpperCase()}
          </h5>
        </div>
        <p className="text-xs">
          Share this coupon for your audiance, and share the discount 50:50 with
          your audiance. you get 10% of the total price, and your audiance get a
          10% discount
        </p>
      </div>
    );

  if (!affiliate.coupon && affiliate.accountId && !isCouponSet)
    return (
      <div className="md:w-1/5">
        <h5>Create Your coupon</h5>
        <div className="flex flex-row w-full justify-between border p-2 rounded-md">
          <input
            type="text"
            name=""
            id=""
            value={couponName}
            onChange={(e) => {
              handleCouponChange(e.target.value);
            }}
            className="outline-none bg-transparent w-full mr-3 text-2xl font-body"
          />
          <CouponLoadingIndicator
            isLoading={isFetching}
            isValid={isValidName}
          />
        </div>

        <PrimaryButton
          onClicked={async () => {
            const resp = await fetchPostJSON("api/affiliate/coupon", {
              accountId: affiliate.accountId,
              uuid: affiliate.uuid,
              couponName: couponName,
            });
            console.log("response was :");
            console.log(resp);

            if (resp.ok) {
              toast.success("Your coupon has been set");
              setIsCouponSet(true);
            } else {
              console.log(resp);

              toast.error(resp.message);
            }
          }}
          text={"Generate Coupon"}
        />
      </div>
    );

  return <></>;
};

interface ICouponLoadingIndictor {
  isValid: boolean;
  isLoading: boolean;
}
const CouponLoadingIndicator = ({
  isLoading,
  isValid,
}: ICouponLoadingIndictor) => {
  //Valid Coupon
  if (isValid && !isLoading) {
    return (
      <div>
        <p>✅︎</p>
      </div>
    );
  }

  //Loading State
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  //invalid coupon
  if (!isValid && !isLoading) {
    return (
      <div>
        <p>❌</p>
      </div>
    );
  }
  return <> </>;
};

export default Portal;
