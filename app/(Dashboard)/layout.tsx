import DashboardSideBar from "@/components/SideBar/DashboardSideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { baseUrl } from "@/util/utils";
import { Metadata } from "next";
import Script from "next/script";
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
    <>
      <div>
        <SidebarProvider>
          <DashboardSideBar />
          <SidebarInset className="">
            <header className="sticky shadow-md z-10 flex h-12 top-0 shrink-0 items-center bg-background ">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            <main className="px-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </div>

      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v22.0"
      />
      {/* Twitter Widgets */}
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />

      {/* LinkedIn SDK */}
      <Script async src="https://platform.linkedin.com/in.js" />

      <Script async src="//www.instagram.com/embed.js" />
    </>
  );
}
