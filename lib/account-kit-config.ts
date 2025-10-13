import { alchemy, baseSepolia } from "@account-kit/infra";
import { cookieStorage, createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";

export const config = createConfig(
  {
    transport: alchemy({
      rpcUrl: "/api/rpc",
    }),
    chain: baseSepolia,
    ssr: true,
    storage: cookieStorage,
    enablePopupOauth: true,
    sessionConfig: {
      expirationTimeMs: 1000 * 60 * 60 * 24 * 14, // 2 weeks (default is 15 min)
    },
    policyId: "<inserted-by-backend>",
  },
  {
    auth: {
      sections: [
        [{ type: "email" }],
        [{ type: "social", authProviderId: "google", mode: "popup" }],
      ],
      addPasskeyOnSignup: true,
    },
  }
);

export const queryClient = new QueryClient();
