import { Skeleton } from '@/components/ui/skeleton';

export function TrendingCardSkeleton() {
    return (
        <div className="border border-border rounded-xl p-4 flex flex-col gap-3">
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-8 w-full" />
            <div className="flex gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    );
}

export function TrendingListItemSkeleton() {
    return (
        <div className="grid grid-cols-[32px_1fr_auto] items-start gap-3 py-3.5 border-b border-border">
            <Skeleton className="h-4 w-6 ml-auto" />
            <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-3/4" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-4 w-16 rounded-full" />
            </div>
        </div>
    );
}

export function TrendingPageSkeleton() {
    return (
        <div>
            <div className="grid grid-cols-3 gap-3 mb-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <TrendingCardSkeleton key={i} />
                ))}
            </div>
            <div className="h-px bg-border mb-5" />
            <div>
                {Array.from({ length: 10 }).map((_, i) => (
                    <TrendingListItemSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}