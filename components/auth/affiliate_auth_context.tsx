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

export function useUser() {
  return useContext(AuthContext);
}

const fetcher = (path: string) =>
  fetchGetJSON(
    path
    //${session.data.user?.email}`
  );

interface getAffiliateInterface {
  email: string;
  status: string;
}
function useUserSWR({ email, status }: getAffiliateInterface) {
  // if (status == "authenticated") {
  const { data, error, isLoading } = useSWR(
    `/api/affiliate/user?email=${email}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };

  // } else {
  //   return {
  //     user: authContextDefaultValues.user,
  //     isLoading: false,
  //     isError: false,
  //   };
  // }
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<userType>({} as userType);
  const setUserDetails = (updatedUser: userType) => {
    setUser(updatedUser);
  };

  const session = useSession();

  const data = useUserSWR({
    email: session.data?.user?.email ?? "", //"brucemckayone@gmail.com",
    status: session.status,
  });

  useEffect(() => {
    if (session.data?.user?.email) {
      if (data.user) {
        setUserDetails(data.user);
      }
    }
  }, [data.user]);

  const value: authContextType = {
    user: user,
    setUser: setUserDetails,
    isLoading: data.isLoading,
    isError: data.isError,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
