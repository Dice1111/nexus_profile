import { ContactSort } from "@/components/FilterAndSort/ContactSort";
import Search from "@/components/Search/Search";

import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { fetchCardIdandTitleByUserIdAction } from "../contact/connection/action";
import { CardSelectorBox } from "@/components/Box/CardSelectorBox";
import NoCardSkeleton from "@/components/skeleton/NoCardSkeleton";

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
        <h2 className="text-xl font-bold">Overview</h2>

        {data.data.length > 0 ? (
          <>
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
