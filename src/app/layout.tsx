import type { Metadata } from "next";
import ReduxStoreProvider from "./ReduxStoreProvider";
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
          <Navbar />
          {children}
        </body>
      </ReduxStoreProvider>
    </html>
  );
}
