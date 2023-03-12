"use client";
import homeUrl from "@/lib/constants/urls";
import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { useSession } from "next-auth/react";
import { useContext, createContext, useState, useEffect } from "react";
import useSWR from "swr";
const authContextDefaultValues: authContextType = {
  user: {
    accountId: "",
    affiliateStatus: {
      refId: "",
      status: "pending",
    },
    chargesEnabled: false,
    email: "",
    uuid: "",
  } as userType,
  setUser: (user: userType) => {},
  isError: false,
  isLoading: false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAffiliate() {
  return useContext(AuthContext);
}

const fetcher = (path: string) =>
  fetchGetJSON(
    path
    //${session.data.user?.email}`
  );

interface getAffiliateInterface {
  email: string;
}
function useAffiliateSWR({ email }: getAffiliateInterface) {
  const { data, error, isLoading } = useSWR(
    `/api/affiliate/user?email=${email}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default function AffiliateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<userType>({} as userType);
  const setAffiliateUser = (updatedUser: userType) => {
    setUser(updatedUser);
  };

  const session = useSession();
  const data = useAffiliateSWR({
    email: session.data?.user?.email ?? "", //"brucemckayone@gmail.com",
  });
  useEffect(() => {
    if (data.user) {
      console.log(data.user);

      setAffiliateUser(data.user);
    }
  }, [data.user]);

  const value: authContextType = {
    user: user,
    setUser: setAffiliateUser,
    isLoading: data.isLoading,
    isError: data.isError,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
