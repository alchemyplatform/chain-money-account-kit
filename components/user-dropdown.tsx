"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GradientAvatar } from "@/lib/gradient-avatar";

interface UserProfile {
  id: number;
  userId: string;
  username: string;
  displayName: string;
  paymentAddress: string | null;
}

interface UserDropdownProps {
  profile: UserProfile;
  onLogout: () => void;
}

export function UserDropdown({ profile, onLogout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <GradientAvatar
            username={profile.username}
            name={profile.displayName || profile.username}
            size="sm"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-medium">
              {profile.displayName || profile.username}
            </span>
            <span className="text-xs text-muted-foreground">
              @{profile.username}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.displayName || profile.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              @{profile.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
