"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center justify-center bg-background py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 bg-secondary rounded-2xl text-primary w-full max-w-7xl shadow-lg gap-8 sm:gap-10">
        {/* LEFT SIDE: Title, Description, Button */}
        <div className="flex flex-col w-full md:w-1/2 gap-6 text-left min-w-[300px] ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Oops, Something went wrong!
          </h1>

          <div className="flex flex-col gap-8">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              There was an issue loading the page. Give it another try — it
              might load correctly now!
            </p>

            <Button
              onClick={reset}
              className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground self-start px-6 py-2 sm:px-8 sm:py-3"
              variant="outline"
              size={"lg"}
            >
              Try again
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE: Illustration */}
        <div className="md:w-1/2 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-none">
          <Image
            src="/image/error_svg.svg"
            alt="Error illustration"
            width={300}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
