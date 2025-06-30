"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const errorType = error.name || "Application Error";
  const errorMessage = error.message || "An unexpected error occurred.";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center text-primary">
      <div className="bg-secondary flex flex-col gap-4 rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Something went wrong
        </h1>

        <div className="text-left mb-6 space-y-2">
          <div>
            <span className="font-semibold text-muted-foreground">
              Error Type:
            </span>{" "}
            <span className="font-medium">{errorType}</span>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground">
              Message:
            </span>{" "}
            <span className="text-popover-foreground">{errorMessage}</span>
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition duration-200 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
