"use client";
import homeUrl from "@/lib/constants/urls";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { useSession } from "next-auth/react";
import { useContext, createContext, useState, useEffect } from "react";

const authContextDefaultValues: authContextType = {
  user: {} as userType,
  setUser: (user: userType) => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAffiliate() {
  return useContext(AuthContext);
}

export default function AffiliateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<userType>({} as userType);
  const session = useSession();

  const setAffiliateUser = (updatedUser: userType) => {
    setUser(updatedUser);
  };

  const value: authContextType = {
    user: user,
    setUser: setAffiliateUser,
  };

  useEffect(() => {
    if (session.data?.user) {
      fetchPostJSON(
        `${homeUrl}/api/affiliate/user?email=${session.data.user?.email}`
      ).then((res) => {
        setAffiliateUser(res["data"]);
      });
    }
  });

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
