import { GithubRepo } from '@/types/api';
import { IconStar } from '@tabler/icons-react';
import Link from 'next/link';

interface TrendingListItemProps {
    repo: GithubRepo;
    rank: number;
}

export function TrendingListItem({ repo, rank }: TrendingListItemProps) {
    return (
        <Link href={`/repo/${repo.full_name}`}>
            <div className="grid grid-cols-[32px_1fr_auto] items-start gap-3 py-3.5 border-b border-border last:border-none hover:bg-accent/50 transition-colors px-1 rounded-lg cursor-pointer">
                <span className="text-sm font-medium text-muted-foreground text-right pt-0.5">
                    #{rank}
                </span>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground mb-0.5">{repo.name}</p>
                    <p className="text-xs text-muted-foreground mb-1">{repo.owner.login}</p>
                    <p className="text-xs text-muted-foreground truncate">{repo.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 pt-0.5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <IconStar size={12} />
                        {repo.stargazers_count.toLocaleString()}
                    </span>
                    {repo.language && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                            {repo.language}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}