import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/contexts/user-context";
import { SmartAccountProvider } from "@/contexts/smart-account-context";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { config } from "@/lib/account-kit-config";
import { cookieToInitialState } from "@account-kit/core";
import { headers } from "next/headers";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ChainMoney",
  description: "Send payments and earn yield with Alchemy Account Kit",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const initialState = cookieToInitialState(
    config,
    headersList.get("cookie") ?? undefined
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Providers initialState={initialState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmartAccountProvider>
              <UserProvider>
                {children}
                <Toaster
                  position="top-center"
                  richColors
                  closeButton
                />
              </UserProvider>
            </SmartAccountProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
