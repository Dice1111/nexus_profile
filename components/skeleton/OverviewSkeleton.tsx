import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewSkeleton() {
  return (
    <div className=" flex flex-col gap-6">
      {/* InfoBox Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="col-span-1 xl:col-span-2">
            <div className="bg-secondary rounded-lg py-12 px-6 flex flex-col gap-4">
              {/* Header: Title + Desc + Icon */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-24 bg-primary/20 rounded" />
                  <Skeleton className="h-4 w-40 bg-primary/20 rounded" />
                </div>
                <Skeleton className="w-10 h-10 rounded-full bg-primary/30 shrink-0" />
              </div>

              {/* Value */}
              <Skeleton className="h-7 w-20 bg-primary/20 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-secondary rounded-lg p-6 flex flex-col gap-6">
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-32 bg-primary/20 rounded" />
            <Skeleton className="h-4 w-64 bg-primary/10 rounded" />
          </div>
          <Skeleton className="h-10 w-[160px] bg-primary/20 rounded-lg" />
        </div>

        {/* Chart Area */}
        <Skeleton className="h-[300px] w-full bg-primary/10 rounded-lg" />
      </div>
    </div>
  );
}
