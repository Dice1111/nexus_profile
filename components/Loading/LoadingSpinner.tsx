import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={"flex justify-center items-center"}>
      <div
        className={cn(
          "w-8 h-8 rounded-full border-4 border-gray-200 border-t-primary animate-spin",
          className
        )}
      />
    </div>
  );
}
