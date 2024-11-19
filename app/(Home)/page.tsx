"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Main Content */}
      <div className="flex-1 p-6 text-center">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary-foreground ">
            Welcome to Your NFC Business Card Dashboard
          </h1>

          {/* Login Button */}
          <button
            className="border border-secondary text-white px-6 py-3 rounded-lg "
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className=" text-primary-foreground text-center p-4">
        <p>© {new Date().getFullYear()} Nexus Nova. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
