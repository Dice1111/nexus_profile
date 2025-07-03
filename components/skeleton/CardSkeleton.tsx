// components/ProfileComponent/InitialProfileCard/LoadingProfileCard.tsx
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="w-[300px]">
      <Skeleton className="h-4 w-1/2 bg-secondary mb-3" />
      <div className="w-[300px] h-[530px] rounded-lg bg-secondary shadow-inner relative overflow-hidden flex flex-col border  p-4">
        {/* Top image/banner skeleton */}
        <Skeleton className="h-60 w-full rounded-md mb-4 bg-primary/20" />
        {/* Text/content skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4 bg-primary/20" />
          <Skeleton className="h-4 w-1/2 bg-primary/20" />
          <Skeleton className="h-4 w-full bg-primary/20" />
          <Skeleton className="h-4 w-2/3 bg-primary/20" />
          <Skeleton className="h-4 w-3/4 bg-primary/20" />
          <Skeleton className="h-4 w-1/2 bg-primary/20" />
          <Skeleton className="h-4 w-full bg-primary/20" />
          <Skeleton className="h-4 w-2/3 bg-primary/20" />
        </div>

        {/* Optional: fade bottom effect */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-24"
          style={{
            background: "linear-gradient(to bottom, transparent, white)",
          }}
        />
      </div>
    </div>
  );
};

export default CardSkeleton;
