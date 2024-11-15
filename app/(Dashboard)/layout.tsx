import DashboardSideBar from "@/components/SideBar/DashboardSideBar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
      <SidebarProvider>
        <DashboardSideBar />
        <SidebarInset className="flex-1 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <main className="min-h-screen flex items-center justify-center">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
