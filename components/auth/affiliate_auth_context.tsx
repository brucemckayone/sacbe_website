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
}
function useUserSWR({ email }: getAffiliateInterface) {
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

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<userType>({} as userType);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const setUserDetails = (updatedUser: userType) => {
    setUser(updatedUser);
  };
  const session = useSession();
  useEffect(() => {
    const fetchUser = async () => {
      setIsError(false);
      if (session.data?.user) {
        const user = await fetchGetJSON(
          `/api/affiliate/user?email=${session.data.user.email}`
        ).catch((err) => {
          setIsError(true);
          setIsLoading(false);
        });
        setIsLoading(false);
        setUserDetails(user.user);
      }
    };
    fetchUser();
  }, []);

  const value: authContextType = {
    user: user,
    setUser: setUserDetails,
    isLoading: isLoading,
    isError: isError,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
