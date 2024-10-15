import type { Metadata } from "next";
import ReduxStoreProvider from "./ReduxStoreProvider";
import Providers from "@/lib/Providers";

import { Navbar } from "@/components/navbar/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nothing Personal Just Business",
  description: "Military supplies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxStoreProvider>
        <body>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </ReduxStoreProvider>
    </html>
  );
}
