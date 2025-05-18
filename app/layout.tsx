import "./globals.css";
import type { Metadata } from "next";
import { baseUrl } from "@/util/utils";

export const metadata: Metadata = {
  title: "Nexus Nova",
  description: "NFC Digital Business Card Website",
  openGraph: {
    type: "website",
    title: "Nexus Nova",
    description: "NFC Digital Business Card Website",
    url: baseUrl,
    siteName: "Nexus Nova",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
