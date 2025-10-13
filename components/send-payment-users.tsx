"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Send } from "lucide-react";
import { SendPaymentModal } from "./send-payment-modal";
import { GradientAvatar } from "@/lib/gradient-avatar";

interface User {
  id: number;
  userId: string;
  username: string;
  displayName: string;
  paymentAddress: string;
  isEarningYield: boolean;
}

interface SendPaymentUsersProps {
  currentUser: { email?: string | null } | null;
}

export function SendPaymentUsers({ currentUser }: SendPaymentUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/with-payment-addresses");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      // Filter out the current user by email (which is stored as userId in the DB)
      const filteredUsers = data.users.filter(
        (user: User) => user.userId !== currentUser?.email
      );
      setUsers(filteredUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.email]);

  const handlePay = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };


  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Send Payment To
          </CardTitle>
          <CardDescription>Loading users...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Send Payment To
          </CardTitle>
          <CardDescription className="text-destructive">
            Error: {error}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Send Payment To
          </CardTitle>
          <CardDescription>
            No other users have set their payment addresses yet.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Send Payment To
          </CardTitle>
          <CardDescription>
            {users.length} user{users.length !== 1 ? "s" : ""} available to
            receive payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 flex-shrink-0">
                    <GradientAvatar
                      username={user.username}
                      name={user.displayName}
                      size="md"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="font-semibold truncate">{user.displayName}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      @{user.username}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handlePay(user)}
                  size="sm"
                  className="flex items-center gap-2 ml-2"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden lg:inline">Send</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Send Payment Modal */}
      {selectedUser && (
        <SendPaymentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipient={{
            id: selectedUser.userId,
            displayName: selectedUser.displayName,
            username: selectedUser.username,
            paymentAddress: selectedUser.paymentAddress,
            isEarningYield: selectedUser.isEarningYield,
          }}
        />
      )}
    </>
  );
}
