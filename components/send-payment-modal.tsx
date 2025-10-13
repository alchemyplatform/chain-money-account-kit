"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Send, DollarSign } from "lucide-react";
import { GradientAvatar } from "@/lib/gradient-avatar";
import { encodeFunctionData, parseUnits, formatUnits, type Hex } from "viem";
import { useSendUserOperation } from "@account-kit/react";
import { useUser } from "@/contexts/user-context";
import { useSmartAccount } from "@/contexts/smart-account-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  USDC_CONTRACT_ADDRESS,
  AUSDC_CONTRACT_ADDRESS,
  AAVE_V3_POOL_ADDRESS,
  BLOCK_EXPLORER_URL
} from "@/lib/constants";
import { ERC20_ABI, AAVE_POOL_ABI, ATOKEN_ABI } from "@/lib/aave-abis";

interface SendPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    displayName: string;
    username: string;
    paymentAddress: string;
    isEarningYield: boolean;
  };
}

export function SendPaymentModal({
  isOpen,
  onClose,
  recipient,
}: SendPaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const { profile } = useUser();
  const { client, address: smartAccountAddress } = useSmartAccount();
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: async (result) => {
      console.log("Transaction success callback:", result);
      const transactionHash = result?.hash;

      // Save transaction to database
      if (transactionHash && profile?.userId) {
        try {
          console.log("Saving transaction to database:", {
            transactionHash,
            fromUserId: profile.userId,
            toUserId: recipient.id,
            amount: amount,
            message: message || null,
          });

          const response = await fetch("/api/transactions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transactionHash,
              fromUserId: profile.userId,
              toUserId: recipient.id,
              amount: amount,
              message: message || null,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Failed to save transaction to database:", response.status, errorData);
          } else {
            const data = await response.json();
            console.log("Transaction saved successfully:", data);
          }
        } catch (error) {
          console.error("Error saving transaction:", error);
        }
      }

      // Close modal and reset form
      setAmount("");
      setMessage("");
      onClose();

      // Show success toast
      toast.success("Payment sent!", {
        description: `$${amount} sent to ${recipient.displayName}`,
        duration: 6000,
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
        className: "success-toast",
        style: {
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          color: "white",
          border: "none",
          minHeight: "70px",
          padding: "16px",
        },
      });

      // Navigate to home
      router.push("/");
    },
    onError: (error) => {
      console.error("Transaction failed:", error);
      toast.error("Payment failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
        duration: 5000,
      });
    },
  });
  const router = useRouter();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSendPayment = async () => {
    // Validation checks
    if (!client || !smartAccountAddress) {
      toast.error("Please sign in first");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount greater than $0");
      return;
    }

    try {
      // Convert amount to tokens with 6 decimals
      const requestedAmount = parseUnits(amount, 6);

      console.log(`Sending ${amount} to ${recipient.displayName}`);
      console.log(`Recipient wants yield: ${recipient.isEarningYield}`);

      // Step 1: Check sender's balances (both USDC and aUSDC)
      const senderUsdcBalance = await client.readContract({
        address: USDC_CONTRACT_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [smartAccountAddress as `0x${string}`],
      }) as bigint;

      const senderAusdcBalance = await client.readContract({
        address: AUSDC_CONTRACT_ADDRESS as `0x${string}`,
        abi: ATOKEN_ABI,
        functionName: "balanceOf",
        args: [smartAccountAddress as `0x${string}`],
      }) as bigint;

      const totalBalance = senderUsdcBalance + senderAusdcBalance;

      console.log(`Sender USDC: ${formatUnits(senderUsdcBalance, 6)}`);
      console.log(`Sender aUSDC: ${formatUnits(senderAusdcBalance, 6)}`);
      console.log(`Total: ${formatUnits(totalBalance, 6)}`);

      // Check if sender has enough total balance
      if (totalBalance < requestedAmount) {
        toast.error("Insufficient balance", {
          description: `You have $${formatUnits(totalBalance, 6)} total, but need $${amount}`,
        });
        return;
      }

      // Step 2: Build the transaction calls array
      const calls: Array<{ target: `0x${string}`; data: Hex }> = [];

      // Determine which token to send based on recipient preference
      const tokenToSend = recipient.isEarningYield ? AUSDC_CONTRACT_ADDRESS : USDC_CONTRACT_ADDRESS;
      const tokenToSendBalance = recipient.isEarningYield ? senderAusdcBalance : senderUsdcBalance;

      console.log(`Need to send: ${recipient.isEarningYield ? 'aUSDC' : 'USDC'}`);
      console.log(`Current balance of that token: ${formatUnits(tokenToSendBalance, 6)}`);

      // Step 3: If we don't have enough of the token recipient wants, convert first
      if (tokenToSendBalance < requestedAmount) {
        const amountToConvert = requestedAmount - tokenToSendBalance;
        console.log(`Need to convert ${formatUnits(amountToConvert, 6)} first`);

        if (recipient.isEarningYield) {
          // Need more aUSDC: supply USDC to AAVE
          // Check if we need approval
          const currentAllowance = await client.readContract({
            address: USDC_CONTRACT_ADDRESS as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "allowance",
            args: [smartAccountAddress as `0x${string}`, AAVE_V3_POOL_ADDRESS as `0x${string}`],
          }) as bigint;

          if (currentAllowance < amountToConvert) {
            const approvalData = encodeFunctionData({
              abi: ERC20_ABI,
              functionName: "approve",
              args: [AAVE_V3_POOL_ADDRESS as `0x${string}`, amountToConvert],
            });
            calls.push({
              target: USDC_CONTRACT_ADDRESS as `0x${string}`,
              data: approvalData,
            });
          }

          // Supply to AAVE
          const supplyData = encodeFunctionData({
            abi: AAVE_POOL_ABI,
            functionName: "supply",
            args: [USDC_CONTRACT_ADDRESS as `0x${string}`, amountToConvert, smartAccountAddress as `0x${string}`, 0],
          });
          calls.push({
            target: AAVE_V3_POOL_ADDRESS as `0x${string}`,
            data: supplyData,
          });
        } else {
          // Need more USDC: withdraw from AAVE
          const withdrawData = encodeFunctionData({
            abi: AAVE_POOL_ABI,
            functionName: "withdraw",
            args: [USDC_CONTRACT_ADDRESS as `0x${string}`, amountToConvert, smartAccountAddress as `0x${string}`],
          });
          calls.push({
            target: AAVE_V3_POOL_ADDRESS as `0x${string}`,
            data: withdrawData,
          });
        }
      }

      // Step 4: Add the transfer call
      const transferData = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [recipient.paymentAddress as `0x${string}`, requestedAmount],
      });
      calls.push({
        target: tokenToSend as `0x${string}`,
        data: transferData,
      });

      console.log(`Sending ${calls.length} calls in batch transaction`);

      // Send user operation using Account Kit
      // Success and error handling is done in the onSuccess/onError callbacks
      sendUserOperation({
        uo: calls,
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast.error("Failed to prepare transaction", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  const isValidAmount = amount && parseFloat(amount) > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipient Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <GradientAvatar
              username={recipient.username}
              name={recipient.displayName}
              size="lg"
            />
            <div>
              <h3 className="font-semibold">{recipient.displayName}</h3>
              <p className="text-sm text-muted-foreground">
                @{recipient.username}
              </p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                className="pl-10 text-lg"
                disabled={isSendingUserOperation}
              />
            </div>
            {amount && parseFloat(amount) <= 0 && (
              <p className="text-sm text-destructive">
                Amount must be greater than $0
              </p>
            )}
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a note to your payment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSendingUserOperation}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {message.length}/500 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSendingUserOperation}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendPayment}
              className="flex-1"
              disabled={!isValidAmount || isSendingUserOperation}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSendingUserOperation ? "Sending..." : "Send Payment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
