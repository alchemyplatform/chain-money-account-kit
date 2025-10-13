"use client";

import { useUser } from "@/contexts/user-context";
import { useAuthModal, useLogout } from "@account-kit/react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";

export function UserAuth() {
  const { user, profile } = useUser();
  const { openAuthModal } = useAuthModal();
  const { logout } = useLogout();

  if (!user) {
    return (
      <Button onClick={openAuthModal} variant="default">
        Sign In
      </Button>
    );
  }

  if (profile) {
    return <UserDropdown profile={profile} onLogout={logout} />;
  }

  return (
    <Button onClick={() => logout()} variant="outline">
      Sign Out
    </Button>
  );
}
