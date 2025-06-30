import { Skeleton } from "@/components/ui/skeleton";

export default function ContactSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Optional heading skeleton */}
      <Skeleton className="h-5 w-72 rounded bg-secondary" />

      <div className="bg-secondary rounded-lg flex flex-col divide-y divide-primary/20">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-8 p-5"
          >
            {/* Left side: Avatar + Text */}
            <div className="flex items-start gap-4 w-full">
              <Skeleton className="w-14 h-14 rounded-full bg-primary/20" />

              <div className="flex flex-col gap-2 flex-1">
                {/* Name + Tag */}
                <div className="flex gap-4 items-center">
                  <Skeleton className="h-6 w-32 rounded bg-primary/20" />
                  <Skeleton className="h-6 w-16 rounded-full bg-primary/20" />
                </div>

                {/* Occupation + Company */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm text-muted-foreground">
                  <Skeleton className="h-3 w-28 rounded bg-primary/20" />
                  <div className="hidden sm:flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full bg-primary/20" />
                    <Skeleton className="h-3 w-36 rounded bg-primary/20" />
                  </div>
                  <div className="sm:hidden">
                    <Skeleton className="h-3 w-36 rounded bg-primary/20" />
                  </div>
                </div>

                {/* Date */}
                <Skeleton className="h-3 w-40 rounded bg-primary/20" />

                {/* Mobile remove button */}
                <div className="lg:hidden">
                  <Skeleton className="h-8 w-20 rounded-md bg-primary/20" />
                </div>
              </div>
            </div>

            {/* Desktop remove button */}
            <div className="hidden lg:flex items-center">
              <Skeleton className="h-8 w-20 rounded-md bg-primary/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
