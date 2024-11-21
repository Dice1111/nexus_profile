import DashboardSideBar from "@/components/SideBar/DashboardSideBar";
import LightModeDarkModeButton from "@/components/LightModeDarkMode/LightModeDarkModeButton";
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

// export default async function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <div>
//       <SidebarProvider>
//         <DashboardSideBar />
//         <SidebarInset className="flex-1 overflow-hidden">
//           <header className=" sticky top-0 bg-purple-400 flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12  ">
//             <div className="flex items-center gap-2 px-4">
//               <SidebarTrigger className="-ml-1" />
//             </div>
//             <LightModeDarkModeButton />
//           </header>
//           <main className="container mx-auto px-4">{children}</main>
//         </SidebarInset>
//       </SidebarProvider>
//     </div>
//   );
// }

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <SidebarProvider>
        <DashboardSideBar />
        <SidebarInset>
          <header className="sticky top-0 z-10 bg-purple-400 flex h-12 shrink-0 items-center shadow-md">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            <LightModeDarkModeButton />
          </header>
          <main className="container mx-auto px-4 pt-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
