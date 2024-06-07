"use client";

import React, { useState, useEffect } from "react";
import { NextFont } from "next/dist/compiled/@next/font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider, deserialize, serialize } from "wagmi";
import { config } from "@/config/wagmi.config";
import { DexaProvider } from "@/context/dexa.context";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/auth.context";
import SwitchChain from "./Auth/SwitchChain";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "swiper/css";
import { DexaMessengerProvider } from "@/context/dexa-messenger.context";
import { StreamProvider } from "@/context/stream.context";
import { CookiesProvider } from "react-cookie";
import { ConverterProvider } from "@/context/currency.context";
import {
  PersistQueryClientProvider,
  Persister,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// const persister = createSyncStoragePersister({
//   serialize,
//   storage: window.localStorage,
//   deserialize,
// });

export default function HTML({
  children,
  font,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  font: NextFont;
  initialState?: State;
}>) {
  const [persister, setPersister] = useState<Persister>(
    createSyncStoragePersister({
      serialize,
      storage: typeof window !== "undefined" ? window.localStorage : null,
      deserialize,
    })
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const syncPersister = createSyncStoragePersister({
        serialize,
        storage: window.localStorage,
        deserialize,
      });
      setPersister(syncPersister);
    }
  }, []);

  return (
    <html lang="en" className="overflow-hidden">
      <body id="body" className={`${font.className} overflow-auto`}>
        <Provider store={store}>
          <WagmiProvider config={config}>
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister }}
            >
              <CookiesProvider defaultSetOptions={{ path: "/" }}>
                <AuthProvider>
                  <DexaProvider>
                    <DexaMessengerProvider>
                      <StreamProvider>
                        <ConverterProvider>
                          <ProgressBar
                            height="4px"
                            color="#4338ca"
                            options={{ showSpinner: false }}
                            shallowRouting
                          />
                          <SwitchChain />
                          <main>{children}</main>
                          <Toaster />
                        </ConverterProvider>
                      </StreamProvider>
                    </DexaMessengerProvider>
                  </DexaProvider>
                </AuthProvider>
              </CookiesProvider>
            </PersistQueryClientProvider>
          </WagmiProvider>
        </Provider>
      </body>
    </html>
  );
}
