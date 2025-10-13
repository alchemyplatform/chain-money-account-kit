"use client";

import { UserAuth } from "@/components/user-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AppNavigation } from "@/components/app-navigation";
import { useUser } from "@/contexts/user-context";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex items-center p-3 px-5 text-sm">
          <div className="font-bold text-xl">ChainMoney</div>
          {user && <AppNavigation />}
          <div className="ml-auto">
            <UserAuth />
          </div>
        </div>
      </nav>

      <div
        className="flex flex-col items-center"
        style={{ minHeight: "calc(100vh - 12rem)" }}
      >
        <div className="w-full max-w-5xl p-5 py-12 flex-1">{children}</div>
      </div>

      <footer className="w-full border-t bg-muted/30">
        <div className="max-w-5xl mx-auto px-5 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">ChainMoney</h3>
              <p className="text-sm text-muted-foreground">
                Demo app showcasing onchain payments powered by Alchemy&apos;s
                Account Kit.
              </p>
            </div>

            {/* Resources Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-sm">Resources</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://dashboard.alchemy.com/signup"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign up for Alchemy
                </a>
                <a
                  href="https://www.alchemy.com/docs/reference/smart-wallet-quickstart/api"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Wallet API Quickstart
                </a>
                <a
                  href="https://www.alchemy.com/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Alchemy docs
                </a>
              </div>
            </div>

            {/* Demo Info */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-sm">This Demo</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/alchemyplatform/chain-money-account-kit"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View GitHub Repo
                </a>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Built with Next.js
                </a>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  UI using shadcn/ui
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-border gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 ChainMoney Demo. Built with ❤️ at Alchemy.
            </p>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <span className="text-xs text-muted-foreground">
                Powered by{" "}
                <a
                  href="https://www.alchemy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold hover:underline"
                >
                  Alchemy
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
