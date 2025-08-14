"use client";
import { Geist, Geist_Mono, Outfit, Roboto } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UIProvider } from "@/providers/ui-context";
import { Provider } from "react-redux";
import store, { persistor } from "@/providers/store";
import MainContent from "@/components/layout/main/MainContent";

import dynamic from "next/dynamic";
import ReduxLoaderOverlay from "@/components/ui/ReduxLoaderOverlay";
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

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
          <ReduxLoaderOverlay />
          <PersistGate loading={null} persistor={persistor}>
            <UIProvider>
              <div className="app-layout h-[100vh] bg-[#FCFBFF]">
                <div className="main-content">
                  <MainContent>{children}</MainContent>
                </div>
              </div>
            </UIProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
