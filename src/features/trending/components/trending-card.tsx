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

const rankStyles: Record<number, { label: string; color: string }> = {
    1: { label: '#1', color: '#F59E0B' },
    2: { label: '#2', color: '#94A3B8' },
    3: { label: '#3', color: '#B45309' },
};

export function TrendingCard({ repo, rank }: TrendingCardProps) {
    const rankStyle = rankStyles[rank];

    return (
        <Link href={`/repo/${repo.full_name}`} className="h-full">
            <div className="bg-background border border-border rounded-xl p-4 hover:border-[var(--accent-blue-border)] transition-colors cursor-pointer h-full flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            src={repo.owner.avatar_url}
                            alt={repo.owner.login}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate leading-tight">
                                {repo.name}
                            </p>
                            <p
                                className="text-[11px] truncate leading-tight"
                                style={{ color: 'var(--accent-blue)' }}
                            >
                                {repo.owner.login}
                            </p>
                        </div>
                    </div>
                    <span
                        className="text-base font-semibold flex-shrink-0"
                        style={{ color: rankStyle.color }}
                    >
                        {rankStyle.label}
                    </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                    {repo.description ?? 'No description provided.'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic) => (
                            <span
                                key={topic}
                                className="text-[10px] px-1.5 py-0.5 rounded-full"
                                style={{
                                    background: 'var(--accent-blue-subtle)',
                                    color: 'var(--accent-blue)',
                                    border: '0.5px solid var(--accent-blue-border)',
                                }}
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t border-border">
                    {repo.language && (
                        <span className="flex items-center gap-1.5">
                            <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{
                                    background:
                                        languageColors[repo.language] ?? '#888',
                                }}
                            />
                            {repo.language}
                        </span>
                    )}
                    <span className="flex items-center gap-1 ml-auto">
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
