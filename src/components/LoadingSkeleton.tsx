import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  className?: string;
}

export const ChartSkeleton = ({ className }: LoadingSkeletonProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-1">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-5/6" />
        <Skeleton className="h-2 w-4/6" />
      </div>
    </div>
  );
};

export const DataSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-4 w-32" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <ChartSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};