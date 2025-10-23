import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, ExternalLink, Info } from "lucide-react";
import { GradientAvatar } from "@/lib/gradient-avatar";
import { LatestTransactions } from "@/components/latest-transactions";

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

interface HeroProps {
  latestTransactions: Transaction[];
}

export function Hero({ latestTransactions }: HeroProps) {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* Main Hero Section */}
      <div className="flex flex-col gap-8 items-center max-w-5xl text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            ChainMoney
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl">
            Fast transfers. Earn yield. All onchain.
          </p>
        </div>

        <div className="flex gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>

        {/* Demo Notice Banner */}
        <Card className="w-full border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-3 text-center flex-wrap">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Demo Application
                </span>
              </div>
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Built with Alchemy Smart Wallets
              </span>
              <Button
                asChild
                variant="link"
                size="sm"
                className="h-auto p-0 text-blue-600 dark:text-blue-400"
              >
                <a
                  href="https://www.alchemy.com/docs/wallets/reference/account-kit/react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  View API Docs
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mt-8">
        {/* Fast Transfers Section */}
        <Card className="relative overflow-hidden border-2">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Fast Transfers</h2>
              </div>

              {/* Illustration */}
              <div className="relative py-8">
                <div className="flex items-center justify-center gap-8">
                  {/* Sender */}
                  <div className="flex flex-col items-center gap-2">
                    <GradientAvatar
                      username="alice"
                      name="Alice"
                      size="lg"
                    />
                    <div className="text-sm font-medium">Alice</div>
                  </div>

                  {/* Arrow with amount */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold">
                      $50
                    </div>
                    <ArrowRight className="h-8 w-8 text-muted-foreground animate-pulse" />
                  </div>

                  {/* Recipient */}
                  <div className="flex flex-col items-center gap-2">
                    <GradientAvatar
                      username="bob"
                      name="Bob"
                      size="lg"
                    />
                    <div className="text-sm font-medium">Bob</div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Instant Transfer</div>
                    <div className="text-sm text-muted-foreground">Send money in seconds, no waiting</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">No Fees</div>
                    <div className="text-sm text-muted-foreground">Keep 100% of what you send and receive</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Onchain & Verifiable</div>
                    <div className="text-sm text-muted-foreground">Every transaction is recorded on Base Sepolia</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earn Yield Section */}
        <Card className="relative overflow-hidden border-2">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Earn Yield</h2>
              </div>

              {/* Illustration */}
              <div className="relative py-8">
                <div className="flex flex-col items-center gap-6">
                  {/* Toggle Illustration */}
                  <div className="w-full max-w-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-2xl border-2 border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">Earn on Balance</div>
                        <div className="text-sm text-muted-foreground">4% APY</div>
                      </div>
                      <div className="w-16 h-9 bg-green-600 rounded-full relative flex items-center justify-end px-1">
                        <div className="w-7 h-7 bg-white rounded-full shadow-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Balance Display */}
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 dark:text-green-400">
                      $1,000
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Earning <span className="font-semibold text-green-600 dark:text-green-400">$40/year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Automatic Yield</div>
                    <div className="text-sm text-muted-foreground">Earn APY by holding dollars</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Toggle Anytime</div>
                    <div className="text-sm text-muted-foreground">Turn earning on or off with one click</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Powered by AAVE</div>
                    <div className="text-sm text-muted-foreground">Secure, decentralized lending protocol</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Transactions Section */}
      <LatestTransactions transactions={latestTransactions} />
    </div>
  );
}
