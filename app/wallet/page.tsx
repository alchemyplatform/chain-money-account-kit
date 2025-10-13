"use client";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Plus,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/user-context";
import { useSmartAccount } from "@/contexts/smart-account-context";
import { useWalletBalance } from "@/hooks/use-wallet-balance";
import { useAaveApy } from "@/hooks/use-aave-apy";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BLOCK_EXPLORER_URL,
  NETWORK_NAME,
  AAVE_MARKET_URL,
  AAVE_DOCS_URL,
  USDC_CONTRACT_ADDRESS,
  AAVE_V3_POOL_ADDRESS,
} from "@/lib/constants";
import { useSendUserOperation } from "@account-kit/react";
import { encodeFunctionData, formatUnits } from "viem";
import { ERC20_ABI, AAVE_POOL_ABI } from "@/lib/aave-abis";

// Circle USDC Faucet
const USDC_FAUCET_URL = "https://faucet.circle.com/";

export default function WalletPage() {
  const [isEarningEnabled, setIsEarningEnabled] = useState(false);
  const [isTogglingEarn, setIsTogglingEarn] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const { profile, refetchProfile } = useUser();
  const { client, address: smartAccountAddress, isLoadingClient } = useSmartAccount();
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: async ({ hash }) => {
      console.log("Transaction successful! Hash:", hash);

      // Update the database with the new earning status
      if (profile?.userId) {
        try {
          await fetch(`/api/profile/${profile.userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isEarningYield: isEarningEnabled,
            }),
          });
        } catch (error) {
          console.error("Error updating profile earning status:", error);
        }
      }

      toast.success("Transaction successful!", {
        description: `Transaction confirmed`,
        action: {
          label: "View Receipt",
          onClick: () =>
            window.open(`${BLOCK_EXPLORER_URL}/tx/${hash}`, "_blank"),
        },
      });
      await refetchBalance();
      await refetchProfile();
      setIsTogglingEarn(false);
    },
    onError: (error) => {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed", {
        description: error instanceof Error ? error.message : "Please try again",
      });
      // Revert the optimistic UI update
      setIsEarningEnabled(prev => !prev);
      setIsTogglingEarn(false);
    },
  });

  // Use cached queries
  const { data: balance = "0.00", isLoading: isLoadingBalance, refetch: refetchBalance } = useWalletBalance();
  const { data: apy = "..." } = useAaveApy();

  // Check if user is earning based on aUSDC balance and sync with profile
  useEffect(() => {
    const checkEarningStatus = async () => {
      if (!client || !smartAccountAddress) return;

      try {
        const ausdcBalance = await client.readContract({
          address: "0xf53B60F4006cab2b3C4688ce41fD5362427A2A66" as `0x${string}`, // aUSDC address
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [smartAccountAddress as `0x${string}`],
        }) as bigint;

        const earning = parseFloat(formatUnits(ausdcBalance, 6));
        const isCurrentlyEarning = earning > 0.01; // Set earning if more than 0.01 USDC in aUSDC

        setIsEarningEnabled(isCurrentlyEarning);

        // Sync with database if there's a mismatch
        if (profile?.userId && profile.isEarningYield !== isCurrentlyEarning) {
          try {
            await fetch(`/api/profile/${profile.userId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isEarningYield: isCurrentlyEarning,
              }),
            });
            await refetchProfile();
          } catch (error) {
            console.error("Error syncing earning status:", error);
          }
        }
      } catch (error) {
        console.error("Error checking earning status:", error);
      }
    };

    checkEarningStatus();
  }, [client, smartAccountAddress, balance, profile, refetchProfile]);

  const handleToggleEarn = async (enabled: boolean) => {
    if (!smartAccountAddress) {
      console.error("No smart account address");
      return;
    }

    console.log("Toggle earn:", { enabled, smartAccountAddress });
    setIsTogglingEarn(true);
    // Optimistically update UI
    const prevState = isEarningEnabled;
    setIsEarningEnabled(enabled);

    try {
      if (enabled) {
        // Supply ALL liquid USDC to AAVE
        // 1. Get current USDC balance using the client
        console.log("Fetching USDC balance for:", smartAccountAddress);

        if (!client) {
          console.error("No client available");
          toast.error("Wallet not initialized");
          setIsEarningEnabled(prevState);
          setIsTogglingEarn(false);
          return;
        }

        const usdcBalance = await client.readContract({
          address: USDC_CONTRACT_ADDRESS as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [smartAccountAddress as `0x${string}`],
        }) as bigint;

        console.log("USDC balance:", usdcBalance.toString());

        if (!usdcBalance || usdcBalance === BigInt(0)) {
          console.error("No USDC balance to supply");
          toast.error("No USDC balance to supply");
          setIsEarningEnabled(prevState);
          setIsTogglingEarn(false);
          return;
        }

        // 2. Approve AAVE to spend USDC
        const approveCalldata = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "approve",
          args: [AAVE_V3_POOL_ADDRESS as `0x${string}`, usdcBalance],
        });

        // 3. Supply to AAVE
        const supplyCalldata = encodeFunctionData({
          abi: AAVE_POOL_ABI,
          functionName: "supply",
          args: [
            USDC_CONTRACT_ADDRESS as `0x${string}`,
            usdcBalance,
            smartAccountAddress as `0x${string}`,
            0, // referralCode
          ],
        });

        // Send batch operation
        console.log("Sending batch operation: approve + supply");
        sendUserOperation({
          uo: [
            {
              target: USDC_CONTRACT_ADDRESS as `0x${string}`,
              data: approveCalldata,
            },
            {
              target: AAVE_V3_POOL_ADDRESS as `0x${string}`,
              data: supplyCalldata,
            },
          ],
        });
      } else {
        // Withdraw ALL from AAVE
        // Use max uint256 to withdraw all
        const maxUint256 = BigInt(2) ** BigInt(256) - BigInt(1);

        const withdrawCalldata = encodeFunctionData({
          abi: AAVE_POOL_ABI,
          functionName: "withdraw",
          args: [
            USDC_CONTRACT_ADDRESS as `0x${string}`,
            maxUint256,
            smartAccountAddress as `0x${string}`,
          ],
        });

        sendUserOperation({
          uo: {
            target: AAVE_V3_POOL_ADDRESS as `0x${string}`,
            data: withdrawCalldata,
          },
        });
      }
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast.error("Failed to prepare transaction", {
        description: error instanceof Error ? error.message : "Please try again",
      });
      setIsEarningEnabled(prevState);
      setIsTogglingEarn(false);
    }
  };

  const copyAddress = () => {
    if (smartAccountAddress) {
      navigator.clipboard.writeText(smartAccountAddress);
      toast.success("Address copied to clipboard!");
    }
  };

  const explorerUrl = smartAccountAddress
    ? `${BLOCK_EXPLORER_URL}/address/${smartAccountAddress}`
    : "";

  return (
    <AppLayout>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Hero Balance Section */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-2">
          <CardContent className="pt-8 pb-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm font-medium">Total Balance</span>
              </div>
              {isLoadingBalance ? (
                <Skeleton className="h-16 w-48" />
              ) : (
                <div className="text-6xl font-bold tracking-tight">
                  ${balance}
                </div>
              )}
              {isEarningEnabled && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Earning {apy}% APY</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Earn Yield Section */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Earn Yield on Your Balance
                </CardTitle>
                {apy === "..." ? (
                  <Skeleton className="h-5 w-48" />
                ) : (
                  <CardDescription>
                    Automatically earn {apy}% APY on your balance
                  </CardDescription>
                )}
              </div>
              <div className="flex items-center gap-4">
                {isLoadingBalance ? (
                  <div className="flex items-center gap-4">
                    <div className="text-right space-y-1">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-6 w-11 rounded-full" />
                  </div>
                ) : (
                  <>
                    <div className="text-right">
                      <div className="text-base font-semibold">
                        {isEarningEnabled ? "Earning" : "Disabled"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isEarningEnabled ? `${apy}% APY` : "Enable to earn"}
                      </div>
                    </div>
                    <Switch
                      checked={isEarningEnabled}
                      onCheckedChange={handleToggleEarn}
                      disabled={
                        isTogglingEarn ||
                        isSendingUserOperation ||
                        isLoadingBalance ||
                        parseFloat(balance) === 0
                      }
                      className="data-[state=checked]:bg-green-600 scale-150"
                    />
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Learn More */}
            <button
              onClick={() => setShowLearnMore(!showLearnMore)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showLearnMore ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              How does this work?
            </button>

            {showLearnMore && (
              <div className="p-4 rounded-lg border space-y-4">
                <div className="space-y-2">
                  <p className="font-medium text-sm">How it works</p>
                  <p className="text-sm text-muted-foreground">
                    When enabled, your balance (held in{" "}
                    <a
                      href="https://www.usdc.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline hover:no-underline"
                    >
                      USDC
                    </a>
                    ) is deposited into the{" "}
                    <a
                      href={AAVE_DOCS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline hover:no-underline"
                    >
                      AAVE
                    </a>{" "}
                    lending protocol to earn yield. Your funds remain yours and can be withdrawn anytime.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">Where are my funds?</p>
                  <p className="text-sm text-muted-foreground">
                    Your funds are deposited in{" "}
                    <a
                      href={AAVE_MARKET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline hover:no-underline"
                    >
                      this AAVE market
                    </a>
                    .{" "}
                    {isEarningEnabled ? (
                      <>
                        Because you&apos;re earning interest, you&apos;ll see{" "}
                        <a
                          href={`${BLOCK_EXPLORER_URL}/address/${smartAccountAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground underline hover:no-underline"
                        >
                          aUSDC tokens in your account
                        </a>
                        .
                      </>
                    ) : (
                      <>
                        Because you&apos;re not earning interest, you&apos;ll see{" "}
                        <a
                          href={`${BLOCK_EXPLORER_URL}/address/${smartAccountAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground underline hover:no-underline"
                        >
                          USDC tokens in your account
                        </a>
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top up button and content */}
        <div className="w-full">
          <Button
            size="lg"
            variant="outline"
            className={`w-full h-auto py-6 transition-all ${
              showAdvanced
                ? "rounded-b-none border-b-0 bg-accent"
                : ""
            }`}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Top up test balance</div>
                  <div className="text-xs text-muted-foreground">
                    Add funds to your wallet
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
            </div>
          </Button>

          {/* Top up Section */}
          {showAdvanced && (
            <Card className="w-full rounded-t-none border-t-0 animate-in slide-in-from-top-2 duration-200">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Your Smart Account Address
                  </p>
                  {isLoadingClient ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-muted px-3 py-2 rounded-md font-mono break-all">
                        {smartAccountAddress || profile?.paymentAddress || "Loading..."}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyAddress}
                        className="flex-shrink-0"
                        disabled={!smartAccountAddress}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="flex-shrink-0"
                      >
                        <a
                          href={explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Get 10 test USDC from Circle faucet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Copy your address above, paste it into the faucet, and make sure to select{" "}
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {NETWORK_NAME}
                    </span>{" "}
                    as the network.
                  </p>
                  <Button
                    size="default"
                    variant="secondary"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={USDC_FAUCET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open Circle Faucet
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
