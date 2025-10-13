"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Send, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 ml-8">
      <Button 
        asChild 
        variant={pathname === "/" ? "secondary" : "ghost"} 
        className={cn(
          "flex items-center gap-2 h-9 px-3",
          pathname === "/" && "bg-secondary text-secondary-foreground"
        )}
      >
        <Link href="/">
          <Home className="h-4 w-4" />
          Home
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/wallet" ? "secondary" : "ghost"}
        className={cn(
          "flex items-center gap-2 h-9 px-3",
          pathname === "/wallet" && "bg-secondary text-secondary-foreground"
        )}
      >
        <Link href="/wallet">
          <Wallet className="h-4 w-4" />
          Wallet
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/send-payment" ? "secondary" : "ghost"}
        className={cn(
          "flex items-center gap-2 h-9 px-3",
          pathname === "/send-payment" && "bg-secondary text-secondary-foreground"
        )}
      >
        <Link href="/send-payment">
          <Send className="h-4 w-4" />
          Send Payment
        </Link>
      </Button>
    </div>
  );
}