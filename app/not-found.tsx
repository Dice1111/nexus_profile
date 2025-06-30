"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-background/50 via-background to-background/50 py-16 px-6 sm:py-24 sm:px-10 lg:px-12 min-h-screen">
      <div className="relative flex flex-col md:flex-row items-center justify-between p-10 sm:p-16 bg-secondary/90 backdrop-blur-md rounded-3xl text-primary max-w-6xl w-full shadow-2xl gap-12">
        {/* LEFT SIDE: Title, Description, Button */}
        <div className="flex flex-col w-full md:w-1/2 gap-6 text-left min-w-[300px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight whitespace-nowrap">
            404 - Page Not Found
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back home.
          </p>

          <Link
            href="/"
            className="self-start text-primary text-lg sm:text-xl font-medium"
          >
            ⬅ Back to Homepage
          </Link>
        </div>

        {/* RIGHT SIDE: Illustration */}
        <div className="md:w-1/2 flex justify-center w-full max-w-md">
          <Image
            src="/image/page_not_found.svg"
            alt="Page not found illustration"
            width={400}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
