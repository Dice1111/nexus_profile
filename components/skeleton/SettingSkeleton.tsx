import { Skeleton } from "@/components/ui/skeleton";

export default function SettingSkeleton() {
  return (
    <section className="flex flex-col text-primary bg-secondary rounded-lg">
      <div className="p-6 flex flex-col gap-8 rounded-lg">
        {/* Avatar Section */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-24 rounded bg-primary/20" />
          <div className="flex items-center gap-6">
            <Skeleton className="w-16 h-16 rounded-full shrink-0 bg-primary/20" />{" "}
            {/* Avatar */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-36 rounded bg-primary/20" />
              <Skeleton className="h-10 w-36 rounded bg-primary/20" />
            </div>
          </div>
        </div>

        {/* Display Name Section */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-32 rounded bg-primary/20" />
          <Skeleton className="h-4 w-64 rounded bg-primary/20" />
          {/* Subtitle */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64 rounded bg-primary/20" />
            <Skeleton className="h-10 w-20 rounded bg-primary/20" />
          </div>
        </div>

        {/* Email Section */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-20 rounded bg-primary/20" />
          <Skeleton className="h-4 w-72 rounded bg-primary/20" />
          <Skeleton className="h-10 w-64 rounded bg-primary/20" />
        </div>

        {/* Reset Password Section */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-28 rounded bg-primary/20" />
          <Skeleton className="h-4 w-64 rounded bg-primary/20" />
          <Skeleton className="h-10 w-48 rounded bg-primary/20" />
        </div>

        {/* Delete Account Section */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-32 rounded bg-primary/20" />
          <Skeleton className="h-4 w-72 rounded bg-primary/20" />
          <Skeleton className="h-10 w-48 rounded bg-primary/20" />
        </div>
      </div>
    </section>
  );
}
