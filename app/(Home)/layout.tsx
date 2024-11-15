import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Mario",
  description: "Used car dealership",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
