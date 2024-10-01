import type { Metadata } from "next";
import "./globals.css";
import ReduxStoreProvider from "./ReduxStoreProvider";

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
        <body>{children}</body>
      </ReduxStoreProvider>
    </html>
  );
}
