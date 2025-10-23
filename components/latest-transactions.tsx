"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, ArrowRight, MessageSquare, Clock } from "lucide-react";
import { GradientAvatar } from "@/lib/gradient-avatar";
import { BLOCK_EXPLORER_URL } from "@/lib/constants";

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

interface LatestTransactionsProps {
  transactions: Transaction[];
}

export function LatestTransactions({ transactions }: LatestTransactionsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (num % 1 === 0) {
      return num.toString();
    }
    return num.toFixed(2).replace(/\.?0+$/, "");
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Activity
        </CardTitle>
        <CardDescription>
          Latest {transactions.length} transactions on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() =>
                window.open(
                  `${BLOCK_EXPLORER_URL}/tx/${transaction.transactionHash}`,
                  "_blank"
                )
              }
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Avatars */}
                <div className="flex items-center gap-3">
                  <GradientAvatar
                    username={transaction.senderUsername}
                    name={transaction.senderDisplayName}
                    size="md"
                  />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <GradientAvatar
                    username={transaction.recipientUsername}
                    name={transaction.recipientDisplayName}
                    size="md"
                  />
                </div>

                {/* Transaction details */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">
                      {transaction.senderDisplayName}
                    </span>
                    <span className="text-sm text-muted-foreground">→</span>
                    <span className="text-sm text-muted-foreground">
                      {transaction.recipientDisplayName}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
                      <Clock className="h-3 w-3" />
                      {formatDate(transaction.createdAt)}
                    </div>
                  </div>

                  {transaction.message && (
                    <div className="flex items-center gap-2 mt-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-base text-foreground font-medium">
                        {transaction.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    ${formatAmount(transaction.amount)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
