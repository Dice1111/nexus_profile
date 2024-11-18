import "./globals.css";
import type { Metadata } from "next";

import { baseUrl } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
