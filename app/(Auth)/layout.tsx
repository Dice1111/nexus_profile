import { baseUrl } from "@/util/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "NFC Digital Business Card Website",
  openGraph: {
    type: "website",
    title: "Log In - Nexus Nova",
    description: "NFC Digital Business Card Website",
    url: `${baseUrl}/login`,
    siteName: "Nexus Nova",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
