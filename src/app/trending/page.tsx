import { TrendingList } from "@/features/trending/components/trending-list";

export default function Trending() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-medium text-foreground mb-1">
                Trending
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
                What the GitHub community is most excited about today
            </p>
            <TrendingList />
        </div>
    );
}
