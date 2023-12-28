"use client";

import api from "@/lib/apiSchema/apiSchema";
import { authContextType, userType } from "@/types/typings";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import { useSession } from "next-auth/react";
import { useContext, createContext, useState, useEffect, useRef } from "react";

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
    coupon: "",
  } as userType,
  setUser: (user: userType) => {},
  refresh: () => {},
  isError: false,
  isLoading: false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useUser() {
  return useContext(AuthContext);
}

interface getAffiliateInterface {
  email: string;
  status: string;
}

function useUserSWR({ email, status }: getAffiliateInterface) {
  const [user, setUser] = useState<userType>(authContextDefaultValues.user);
  const [isError, setIsError] = useState(false);
  const isMountedRef = useRef(false);

  const fetchData = async () => {
    try {
      const userData = await api.user.get({ data: { email: email } });
      if (userData?.data) {
        setUser(userData?.data ?? authContextDefaultValues.user);
        localStorage.setItem("userDataSacbe", JSON.stringify(userData?.data)); // Store user data in localStorage
      }
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && email && !isMountedRef.current) {
      const storedUserData = localStorage.getItem("userDataSacbe");
      try {
        if (storedUserData) setUser(JSON.parse(storedUserData ?? ""));
      } catch (e) {
        localStorage.setItem("userDataSacbe", "{}");
        fetchData();
      }

      fetchData();
      isMountedRef.current = true;
    }
  }, [email, status]);

  const refresh = async () => {
    fetchData();
  };

  return {
    user,
    isLoading: !isMountedRef.current, // Show loading while initial local data is used
    isError,
    refresh,
  };
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const data = useUserSWR({
    email: session.data?.user?.email ?? "",
    status: session.status,
  });

  const value: authContextType = {
    user: data.user,
    setUser: data.refresh, // You can set the setUser function if required
    isLoading: data.isLoading,
    isError: data.isError,
    refresh: data.refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
