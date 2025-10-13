"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@account-kit/react";
import Avatar from "boring-avatars";

export function Hero() {
  const { openAuthModal } = useAuthModal();

  return (
    <div className="flex flex-col gap-16 items-center text-center">
      {/* Main Hero Section */}
      <div className="flex flex-col gap-8 items-center max-w-4xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Payments Onchain
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Pay and receive payments easier than ever, any time, anywhere
          </p>
        </div>

        <div className="flex gap-4">
          <Button onClick={openAuthModal} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            Sign Up
          </Button>
          <Button onClick={openAuthModal} variant="outline" size="lg">
            Sign In
          </Button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="flex flex-col gap-8 items-center w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Testimonial 1 */}
          <div className="flex flex-col gap-4 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-4">
              <Avatar
                size={56}
                name="alex_crypto"
                variant="beam"
                colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
              />
              <div className="text-left">
                <div className="font-bold text-lg">@alex_crypto</div>
                <div className="text-sm text-muted-foreground">Crypto Enthusiast</div>
              </div>
            </div>
            <p className="text-lg italic text-left">
              &ldquo;Wow, web3 payments have never been easier! This platform completely changed how I handle my crypto transactions.&rdquo;
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="flex flex-col gap-4 p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-4">
              <Avatar
                size={56}
                name="sarah_defi"
                variant="sunset"
                colors={['#FD9843', '#F9CA24', '#F0AB3D', '#A55A3C', '#C271B4']}
              />
              <div className="text-left">
                <div className="font-bold text-lg">@sarah_defi</div>
                <div className="text-sm text-muted-foreground">DeFi Developer</div>
              </div>
            </div>
            <p className="text-lg italic text-left">
              &ldquo;Alchemy&rsquo;s wallet APIs have CHANGED THE GAME! Building payment solutions has never been this straightforward.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
