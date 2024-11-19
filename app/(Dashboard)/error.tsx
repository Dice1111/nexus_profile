"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="bg-popover p-4 rounded-lg shadow-xl max-w-lg w-full text-center">
        <h2 className="text-3xl font-semibold text-popover-foreground mb-4">
          Something Went Wrong!
        </h2>
        <p className="text-popover-foreground mb-6">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          className="bg-primary text-primary-foreground border border-primary px-6 py-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors ease-in-out"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
