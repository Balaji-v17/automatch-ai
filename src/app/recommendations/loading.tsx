import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingSkeletonCard() {
    return (
        <Card>
            <CardHeader className="flex-row items-start gap-4">
                <Skeleton className="h-24 w-24 flex-shrink-0 rounded-md" />
                <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-4/5" />
                    <Skeleton className="h-8 w-1/2" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </CardContent>
        </Card>
    )
}

export default function Loading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <Skeleton className="h-9 w-36 mb-4" />
        <Skeleton className="h-10 w-3/4 md:w-1/2" />
        <Skeleton className="mt-2 h-7 w-full md:w-3/4" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <LoadingSkeletonCard />
        <LoadingSkeletonCard />
        <LoadingSkeletonCard />
      </div>
    </div>
  );
}
