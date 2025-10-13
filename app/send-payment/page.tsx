"use client";

import { SendPaymentUsers } from "@/components/send-payment-users";
import { AppLayout } from "@/components/app-layout";
import { useUser } from "@/contexts/user-context";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";
import { useWalletBalance } from "@/hooks/use-wallet-balance";
import { useAaveApy } from "@/hooks/use-aave-apy";
import { Skeleton } from "@/components/ui/skeleton";

export default function SendPaymentPage() {
  const { user, profile } = useUser();
  const { data: balance = "0.00", isLoading: isLoadingBalance } = useWalletBalance();
  const { data: apy = "..." } = useAaveApy();
  const isEarningYield = profile?.isEarningYield ?? false;

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        {/* Balance Display */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-2">
          <CardContent className="pt-8 pb-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm font-medium">Your Balance</span>
              </div>
              {isLoadingBalance ? (
                <Skeleton className="h-16 w-48" />
              ) : (
                <div className="text-6xl font-bold tracking-tight">
                  ${balance}
                </div>
              )}
              {isEarningYield && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Earning {apy}% APY</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Choose who to pay</h1>
            <p className="text-muted-foreground">
              Select a user from the list below to send them a payment
            </p>
          </div>

          <SendPaymentUsers currentUser={user!} />
        </div>
      </div>
    </AppLayout>
  );
}