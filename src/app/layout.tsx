import type { Metadata } from "next";
import "./globals.css";
import ReduxStoreProvider from "./ReduxStoreProvider";
import { Navbar } from "@/components/navbar/Navbar";

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
