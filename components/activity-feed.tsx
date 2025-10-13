"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowUpRight,
  MessageSquare,
  Clock,
} from "lucide-react";
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

export function ActivityFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions/all");

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.transactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Refresh when page becomes visible (for new transactions)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchTransactions();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchTransactions]);

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
    // If it's a whole number, return without decimals
    if (num % 1 === 0) {
      return num.toString();
    }
    // Otherwise, round to 2 decimal places and remove trailing zeros
    return num.toFixed(2).replace(/\.?0+$/, "");
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Platform Activity
          </CardTitle>
          <CardDescription>Loading recent activity...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Platform Activity
          </CardTitle>
          <CardDescription className="text-destructive">
            Error: {error}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Platform Activity
          </CardTitle>
          <CardDescription>
            No activity yet. Be the first to send a payment!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Platform Activity
        </CardTitle>
        <CardDescription>
          Latest {transactions.length} transaction{transactions.length !== 1 ? "s" : ""} across the platform
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
                  {/* Sender avatar */}
                  <GradientAvatar
                    username={transaction.senderUsername}
                    name={transaction.senderDisplayName}
                    size="md"
                  />

                  {/* Arrow indicator */}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />

                  {/* Recipient avatar */}
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

                  {/* Message if exists */}
                  {transaction.message && (
                    <div className="flex items-center gap-2 mt-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-base text-foreground font-medium">
                        {transaction.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Amount - neutral color */}
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