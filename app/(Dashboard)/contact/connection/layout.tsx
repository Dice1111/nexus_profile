import { CardSelectorBox } from "@/components/Box/CardSelectorBox";
import { ContactFilter } from "@/components/FilterAndSort/ContactFilter";
import { ContactSort } from "@/components/FilterAndSort/ContactSort";
import Search from "@/components/Search/Search";

import { Metadata } from "next";
import { ReactNode } from "react";
import { fetchCardIdandTitleByUserIdAction } from "./action";
import NoCardSkeleton from "@/components/Skeleton/NoCardSkeleton";

export const metadata: Metadata = {
  title: "Connection",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await fetchCardIdandTitleByUserIdAction();

  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Connections</h2>

        {data.data.length > 0 ? (
          <>
            <div className="flex flex-col justify-between items-center gap-4 md:flex-row">
              <Search />
              <div className="flex gap-4 max-md:w-full">
                <ContactFilter />
                <ContactSort />
              </div>
            </div>
            <div className="mt-2">
              <CardSelectorBox data={data.data} />
            </div>
            <div>{children}</div>
          </>
        ) : (
          <NoCardSkeleton />
        )}
      </div>
    </section>
  );
}
