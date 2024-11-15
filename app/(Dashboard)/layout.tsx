import { baseUrl } from "@/lib/utils";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your account and view analytics in the dashboard.",
  openGraph: {
    type: "website",
    title: "Dashboard - Nexus Nova",
    description: "Manage your account and view analytics in the dashboard.",
    url: `${baseUrl}/dashboard`,
    siteName: "Nexus Nova",
    locale: "en_US",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
