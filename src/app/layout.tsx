import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
