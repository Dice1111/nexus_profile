import { ContactFilter } from "@/components/FilterAndSort/ContactFilter";
import { ContactSort } from "@/components/FilterAndSort/ContactSort";
import Search, { SearchFallback } from "@/components/Search/Search";

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
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">My Connections</h2>

      <div className="flex flex-col justify-between items-center gap-4 md:flex-row ">
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
        <div className="flex gap-4 max-md:w-full">
          <ContactFilter />
          <ContactSort />
        </div>
      </div>

      <div>{children}</div>
    </section>
  );
}
