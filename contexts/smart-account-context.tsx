"use client";

import { createContext, useContext } from "react";
import { useSmartAccountClient } from "@account-kit/react";
import type { UseSmartAccountClientResult } from "@account-kit/react";

/**
 * Smart Account Context
 *
 * IMPORTANT: This is the SINGLE SOURCE OF TRUTH for the smart account address.
 * Always use `address` from `useSmartAccount()` for on-chain operations.
 *
 * DO NOT USE:
 * - user.address (removed - was the EOA, not the smart account)
 * - profile.paymentAddress (outdated)
 *
 * ALWAYS USE:
 * - const { address: smartAccountAddress } = useSmartAccount()
 */

type SmartAccountContextType = UseSmartAccountClientResult;

const SmartAccountContext = createContext<SmartAccountContextType | undefined>(
  undefined
);

export function SmartAccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smartAccountClient = useSmartAccountClient({ type: "LightAccount" });

  return (
    <SmartAccountContext.Provider value={smartAccountClient}>
      {children}
    </SmartAccountContext.Provider>
  );
}

export function useSmartAccount() {
  const context = useContext(SmartAccountContext);
  if (context === undefined) {
    throw new Error(
      "useSmartAccount must be used within a SmartAccountProvider"
    );
  }
  return context;
}
