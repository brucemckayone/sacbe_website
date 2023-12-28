"use client";

import SetUpAccountButton from "./SetUpAccountButton";
import AccountBalanceTabs from "./AccountBalanceTabs";

import ShareFunctionalityDescription from "./ShareFunctionalityDescription";
import { useUser } from "@/components/shared/auth/UserProvider";
import { useSession } from "next-auth/react";
import PrimaryButton from "../../shared/buttons/primaryButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Spinner } from "../../shared/loaders/Spinner";
import toast from "react-hot-toast";
import { userType } from "@/types/typings";
import api from "@/lib/apiSchema/apiSchema";

import PaymentLinks from "./PaymentLinks";
import { useSearchParams } from "next/navigation";

enum CouponState {
  set,
  unset,
  preSetup,
  setting,
  error,
}

function Portal() {
  const params = useSearchParams();
  const {
    user: affiliate,
    isLoading: affiliateLoading,
    setUser,
    refresh,
  } = useUser();
  const session = useSession();
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [couponState, setCouponState] = useState<CouponState>(
    CouponState.setting
  );
  const handleInit = async () => {
    setIsLoadingRefresh(true);
    try {
      if (params?.has("refreshUser") && params.has("accountId")) {
        setCouponState(CouponState.unset);
      }
      setIsLoadingRefresh(false);
    } catch (e) {
      toast.error("There was an error fetching your account details");
    }
  };

  useEffect(() => {
    handleInit();
  }, []);

  if (session!.data?.user) {
    // set loading state
    if (affiliateLoading || isLoadingRefresh) {
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
            <div className="flex lg:flex-row flex-col">
              <CouponFeild
                affiliate={affiliate}
                setUser={setUser}
                couponState={couponState}
                setCouponState={setCouponState}
              />
              {affiliate.coupon && <PaymentLinks />}
            </div>
            {affiliate.coupon && <ShareFunctionalityDescription />}

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
  setCouponState: Dispatch<SetStateAction<CouponState>>;
  couponState: CouponState;
}

interface CreateCouponProps {
  couponName: string;
  setCouponName: (name: string) => void;
  affiliate: userType;
  setCouponState: (state: CouponState) => void;
  setIsLoading: (isLoading: boolean) => void;
}

function CreateCoupon(props: CreateCouponProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const { couponName, setCouponName } = props;
  const { refresh } = useUser();
  const handleCouponChange = (newValue: string) => {
    setIsFetching(true);
    setCouponName(newValue.toUpperCase());
  };

  useEffect(() => {
    const asyncFunction = async () => {
      if (!isFetching && couponName.length > 2) {
        const exists = await api.affiliate.coupon.validate.get({
          data: { couponName: couponName },
        });
        setIsValidName(
          !exists && couponName.length >= 4 && !couponName.includes(" ")
        );
      }
    };
    asyncFunction();
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  }, [couponName, handleCouponChange]);

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
        <CouponLoadingIndicator isLoading={isFetching} isValid={isValidName} />
      </div>

      <PrimaryButton
        onClicked={async () => {
          props.setCouponState(CouponState.setting);
          const resp = await api.affiliate.coupon.post({
            data: {
              accountId: props.affiliate.accountId,
              uuid: props.affiliate.uuid,
              couponName: couponName,
            },
          });

          console.log(resp);
          if (resp.status == "success") {
            refresh();
            props.setCouponState(CouponState.set);
            toast.success("Your coupon has been set");
          } else {
            toast.error("There was an error creating your coupon");
            props.setCouponState(CouponState.unset);
            toast.error(resp.message);
          }
        }}
        text={"Generate Coupon"}
      />
    </div>
  );
}

function Coupon(props: { couponName: string; affiliate: userType }) {
  return (
    <div className="mb-10 mx-2  ">
      <h5>Your coupon is:</h5>
      <div className="border rounded-lg drop-shadow-sm p-2  mt-1">
        <h5>{props.affiliate.coupon?.toUpperCase() ?? props.couponName}</h5>
      </div>
      <p className="text-xs">
        Share this coupon for your audiance, and share the discount 1:3 with
        your audiance. you get 10% of the total price, and your audiance get a
        20% discount
      </p>
    </div>
  );
}

const CouponFeild = ({
  affiliate,
  couponState,
  setCouponState,
}: ICouponFeild) => {
  const [couponName, setCouponName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCouponState(CouponState.setting);

    if (affiliate.coupon && affiliate.chargesEnabled && affiliate.accountId) {
      setCouponState(CouponState.set);
    } else handleCouponState();

    function handleCouponState() {
      if (
        !affiliate.coupon &&
        affiliate.accountId &&
        affiliate.chargesEnabled
      ) {
        setCouponState(CouponState.unset);
      } else if (
        !affiliate.coupon &&
        !affiliate.accountId &&
        !affiliate.chargesEnabled
      ) {
        setCouponState(CouponState.preSetup);
      } else {
        setCouponState(CouponState.error);
      }
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  switch (couponState) {
    case CouponState.set:
      return (
        <Coupon couponName={couponName.toUpperCase()} affiliate={affiliate} />
      );
    case CouponState.unset:
      return (
        <CreateCoupon
          couponName={couponName}
          setCouponState={setCouponState}
          setIsLoading={setIsLoading}
          affiliate={affiliate}
          setCouponName={setCouponName}
        />
      );
    case CouponState.setting:
      return <div>Loading...</div>;
    case CouponState.error:
      toast.error("There was a problem fetching your coupon");
      return <div>Error</div>;
    case CouponState.preSetup:
    default:
      return <></>;
  }
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
