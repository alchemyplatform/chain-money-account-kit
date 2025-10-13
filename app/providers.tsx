"use client";

import { config, queryClient } from "@/lib/account-kit-config";
import { AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense, useRef } from "react";

export function Providers(
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>
) {
  const configRef = useRef(config);

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider
          config={configRef.current}
          queryClient={queryClient}
          initialState={props.initialState}
        >
          {props.children}
        </AlchemyAccountProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
