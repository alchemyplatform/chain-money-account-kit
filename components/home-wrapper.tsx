"use client";

import { useUser } from "@/contexts/user-context";
import { Hero } from "@/components/hero";
import { HomeClient } from "@/components/home-client";

interface Transaction {
  id: number;
  transactionHash: string;
  amount: string;
  message: string | null;
  createdAt: string;
  senderDisplayName: string;
  senderUsername: string;
  recipientDisplayName: string;
  recipientUsername: string;
}

interface HomeWrapperProps {
  latestTransactions: Transaction[];
}

export function HomeWrapper({ latestTransactions }: HomeWrapperProps) {
  const { user } = useUser();

  if (user) {
    return <HomeClient />;
  }

  return <Hero latestTransactions={latestTransactions} />;
}
