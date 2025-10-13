"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser as useAccountKitUser } from "@account-kit/react";

interface UserProfile {
  id: number;
  userId: string;
  username: string;
  displayName: string;
  paymentAddress: string | null;
  isEarningYield: boolean;
}

interface UserContextType {
  user: { email?: string | null } | null;
  profile: UserProfile | null;
  loading: boolean;
  refetchProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const accountKitUser = useAccountKitUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Derive user info from Account Kit (email only - use SmartAccountContext for address)
  const user = accountKitUser
    ? {
        email: accountKitUser.email,
      }
    : null;

  const fetchProfile = async (userId: string, smartAccountAddress?: string) => {
    try {
      const url = smartAccountAddress
        ? `/api/profile/${userId}?smartAccountAddress=${smartAccountAddress}`
        : `/api/profile/${userId}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const refetchProfile = async () => {
    if (user?.email) {
      await fetchProfile(user.email);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      if (user?.email) {
        await fetchProfile(user.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    loadProfile();
  }, [user?.email]);

  return (
    <UserContext.Provider value={{ user, profile, loading, refetchProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}