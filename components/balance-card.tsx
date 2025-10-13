"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { DollarSign, Plus } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { encodeFunctionData, parseUnits, formatUnits } from "viem";
import { useSendUserOperation } from "@account-kit/react";
import { useSmartAccount } from "@/contexts/smart-account-context";
import { toast } from "sonner";
import { USDC_CONTRACT_ADDRESS, BLOCK_EXPLORER_URL } from "@/lib/constants";
import { MINT_ABI, ERC20_ABI } from "@/lib/aave-abis";

export function BalanceCard() {
  const [balance, setBalance] = useState<string>("0.00");
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const { client, address: smartAccountAddress } = useSmartAccount();
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: async (result) => {
      const transactionHash = result?.hash;

      // Show celebratory toast for successful top-up
      toast.success("💰 Success!", {
        description: "$20 USDC added to your balance",
        duration: 5000,
        action: transactionHash
          ? {
              label: "View Receipt",
              onClick: () =>
                window.open(
                  `${BLOCK_EXPLORER_URL}/tx/${transactionHash}`,
                  "_blank"
                ),
            }
          : undefined,
        style: {
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          color: "white",
          border: "none",
          minHeight: "70px",
          padding: "16px",
        },
      });

      // Refresh the balance after successful top-up
      fetchBalance();
    },
    onError: (error) => {
      toast.error("Top-up failed", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        duration: 5000,
      });
    },
  });

  const fetchBalance = useCallback(async () => {
    if (!client || !smartAccountAddress) {
      setIsLoadingBalance(false);
      return;
    }

    try {
      setIsLoadingBalance(true);

      // Use client.readContract to fetch balance
      const balance = await client.readContract({
        address: USDC_CONTRACT_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [smartAccountAddress as `0x${string}`],
      }) as bigint;

      const formattedBalance = formatUnits(balance, 6);
      setBalance(parseFloat(formattedBalance).toFixed(2));
    } catch {
      setBalance("0.00");
    } finally {
      setIsLoadingBalance(false);
    }
  }, [client, smartAccountAddress]);

  // Fetch balance when component mounts or when smart account address changes
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleTopUp = () => {
    if (!smartAccountAddress) {
      toast.error("Please sign in first");
      return;
    }

    const amount = parseUnits("20", 6);

    // Generate calldata for mint function
    const calldata = encodeFunctionData({
      abi: MINT_ABI,
      functionName: "mint",
      args: [smartAccountAddress as `0x${string}`, amount],
    });

    // Send user operation using Account Kit
    // Success and error handling is done in the onSuccess/onError callbacks
    sendUserOperation({
      uo: {
        target: USDC_CONTRACT_ADDRESS as `0x${string}`,
        data: calldata,
      },
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoadingBalance ? "Loading..." : `$${balance}`}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Available for payments
        </p>
        <Button
          onClick={handleTopUp}
          className="w-full mt-4"
          disabled={isSendingUserOperation}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isSendingUserOperation ? "Processing..." : "Top Up"}
        </Button>
      </CardContent>
    </Card>
  );
}
