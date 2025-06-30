"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const NoCardSkeleton = () => {
  const router = useRouter();

  const handleCreateCard = () => {
    router.push("/profile");
  };
  return (
    <div className="flex items-center justify-center py-10 px-6 sm:py-16 sm:px-10 lg:px-20 text-primary">
      <div className="flex flex-col md:flex-row items-center justify-between bg-secondary rounded-2xl shadow-lg w-full max-w-5xl gap-10 p-8">
        {/* LEFT SIDE: Text content */}
        <div className="flex flex-col w-full md:w-1/2 gap-6 min-w-[300px] text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            You haven’t created any cards yet
          </h2>

          <p className="text-base sm:text-lg leading-relaxed max-w-md">
            It looks like you haven’t created any cards yet. Get started by
            creating your first card!
          </p>

          <Button
            onClick={handleCreateCard}
            className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground self-start px-6 py-2 sm:px-8 sm:py-3"
            variant="outline"
            size={"lg"}
          >
            Create new card
          </Button>
        </div>

        {/* RIGHT SIDE: Image */}
        <div className="md:w-1/2 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-none">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <Image
              src="/image/no_card.svg"
              alt="No cards illustration"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoCardSkeleton;
