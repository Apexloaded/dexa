"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
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

const queryClient = new QueryClient();

export default function HTML({
  children,
  font,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  font: NextFont;
  initialState?: State;
}>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body id="body" className={`${font.className} overflow-auto`}>
        <Provider store={store}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <CookiesProvider defaultSetOptions={{ path: "/" }}>
                <AuthProvider>
                  <DexaProvider>
                    <DexaMessengerProvider>
                      <StreamProvider>
                        <ProgressBar
                          height="4px"
                          color="#4338ca"
                          options={{ showSpinner: false }}
                          shallowRouting
                        />
                        <SwitchChain />
                        <main>{children}</main>
                        <Toaster />
                      </StreamProvider>
                    </DexaMessengerProvider>
                  </DexaProvider>
                </AuthProvider>
              </CookiesProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </Provider>
      </body>
    </html>
  );
}
