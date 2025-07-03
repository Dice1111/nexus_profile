// app/your-page-path/loading.tsx

import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Profile Cards</h2>

      <div className="w-full flex justify-center">
        <Skeleton className="w-[169px] h-9 rounded-md" />
      </div>

      <div className="flex justify-center gap-10 flex-wrap">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
