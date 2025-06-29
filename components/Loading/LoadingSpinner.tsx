import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center h-fit">
      <div
        className={cn(
          "border-t-4 border-solid rounded-full w-7 h-7 animate-spin",
          className
        )}
      ></div>
    </div>
  );
}
