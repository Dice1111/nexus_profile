import ContactSearchBar from "@/components/Search/ContactSearchBar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Connection",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">My Connections</h2>

      <div>
        <ContactSearchBar />
      </div>
      <div className=" bg-amber-300">{children}</div>
    </section>
  );
}
