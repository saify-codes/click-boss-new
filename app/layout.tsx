"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
