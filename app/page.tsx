"use client";

import { Hero } from "@/components/hero";
import { ActivityFeed } from "@/components/activity-feed";
import { AppLayout } from "@/components/app-layout";
import { useUser } from "@/contexts/user-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <AppLayout>
      {user ? (
        <div className="flex flex-col gap-8">
          {/* Payment Prompt Callout */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Ready to send a payment?</h2>
                    <p className="text-sm text-muted-foreground">Send money instantly to anyone on the platform</p>
                  </div>
                </div>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-11 px-6"
                >
                  <Link href="/send-payment" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Pay
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col gap-6">
            <ActivityFeed />
          </div>
        </div>
      ) : (
        <Hero />
      )}
    </AppLayout>
  );
}
