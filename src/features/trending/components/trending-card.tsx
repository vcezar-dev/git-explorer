import { GithubRepo } from '@/types/api';
import { IconStar, IconGitFork } from '@tabler/icons-react';
import Link from 'next/link';

interface TrendingCardProps {
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

export function TrendingCard({ repo, rank }: TrendingCardProps) {
    return (
        <Link href={`/repo/${repo.full_name}`}>
            <div className="bg-background border border-border rounded-xl p-4 hover:border-border/80 transition-colors cursor-pointer h-full flex flex-col">
                <div className="mb-3">
                    <span className="text-lg font-medium text-foreground">
                        #{rank}
                    </span>
                </div>
                <p className="text-sm font-medium text-foreground truncate mb-0.5">
                    {repo.name}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                    {repo.owner.login}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-2">
                    {repo.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.language && (
                        <span className="flex items-center gap-1.5">
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background:
                                        languageColors[repo.language] ?? '#888',
                                }}
                            />
                            {repo.language}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <IconStar size={12} />
                        {repo.stargazers_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <IconGitFork size={12} />
                        {repo.forks_count.toLocaleString()}
                    </span>
                </div>
            </div>
        </Link>
    );
}
