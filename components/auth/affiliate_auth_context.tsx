"use client";

import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
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
  } as userType,
  setUser: (user: userType) => {},
  isError: false,
  isLoading: false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useUser() {
  return useContext(AuthContext);
}

const fetcher = (path: string) => fetchGetJSON(path);

interface getAffiliateInterface {
  email: string;
  status: string;
}

function useUserSWR({ email, status }: getAffiliateInterface) {
  const [user, setUser] = useState<userType>(authContextDefaultValues.user);
  const [isError, setIsError] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetcher(`/api/affiliate/user?email=${email}`);
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData)); // Store user data in localStorage
      } catch (error) {
        setIsError(true);
      }
    };

    if (status === "authenticated" && email && !isMountedRef.current) {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUser(JSON.parse(storedUserData)); // Retrieve user data from localStorage
      } else {
        fetchData();
      }
      isMountedRef.current = true;
    }
  }, [email, status]);

  return {
    user,
    isLoading: !isMountedRef.current,
    isError,
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
    setUser: () => {}, // You can set the setUser function if required
    isLoading: data.isLoading,
    isError: data.isError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
