import { GithubRepo } from '@/types/api';
import { IconStar } from '@tabler/icons-react';
import Link from 'next/link';

interface TrendingListItemProps {
    repo: GithubRepo;
    rank: number;
}

const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    'C++': '#f34b7d',
};

export function TrendingListItem({ repo, rank }: TrendingListItemProps) {
    return (
        <Link href={`/repo/${repo.full_name}`}>
            <div className="flex items-start gap-3 py-4 border-b border-border last:border-none hover:bg-accent/50 transition-colors px-2 rounded-lg cursor-pointer">
                <span className="text-sm font-medium text-muted-foreground w-6 text-right flex-shrink-0 pt-0.5">
                    #{rank}
                </span>
                <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate mb-0.5">
                                {repo.name}
                            </p>
                            <p
                                className="text-[11px]"
                                style={{ color: 'var(--accent-blue)' }}
                            >
                                {repo.owner.login}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                            <span className="flex items-center gap-1">
                                <IconStar size={12} />
                                {repo.stargazers_count.toLocaleString()}
                            </span>
                            {repo.language && (
                                <span className="flex items-center gap-1.5">
                                    <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{
                                            background:
                                                languageColors[repo.language] ??
                                                '#888',
                                        }}
                                    />
                                    {repo.language}
                                </span>
                            )}
                        </div>
                    </div>
                    {repo.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 line-clamp-1">
                            {repo.description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
