"use client";
import { Outfit, Roboto } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UIProvider } from "@/providers/ui-context";
import { Provider } from "react-redux";
import store, { persistor } from "@/providers/store";
import MainContent from "@/app/core/layout/main/MainContent";
import { PrimeReactProvider } from 'primereact/api';

import dynamic from "next/dynamic";
import { TenantProvider } from "@/providers/tenant-context";
const PersistGate = dynamic(
  () =>
    import("redux-persist/integration/react").then((mod) => mod.PersistGate),
  { ssr: false }
);

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfitSans.variable} ${robotoSans.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PrimeReactProvider>
              <UIProvider>
                <TenantProvider>
                  <div className="app-layout h-[100vh] bg-[#FCFBFF]">
                    <div className="main-content">
                      <MainContent>{children}</MainContent>
                    </div>
                  </div>
                </TenantProvider>
              </UIProvider>
            </PrimeReactProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
