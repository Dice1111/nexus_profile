import { ContactSort } from "@/components/FilterAndSort/ContactSort";
import Search from "@/components/Search/Search";

import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Connection",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Account Setting</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
