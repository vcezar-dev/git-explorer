'use client';

import { useContributors } from '../api/get-contributors';
import Link from 'next/link';

interface RepoContributorsProps {
    owner: string;
    name: string;
}

export function RepoContributors({ owner, name }: RepoContributorsProps) {
    const { data, isLoading } = useContributors(owner, name);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-secondary animate-pulse" />
                        <div className="h-3 w-24 bg-secondary rounded animate-pulse" />
                        <div className="h-3 w-10 bg-secondary rounded animate-pulse ml-auto" />
                    </div>
                ))}
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex flex-col gap-2">
            {data.length > 0 ? (
                data.map((contributor) => (
                    <Link
                        key={contributor.id}
                        href={`/user/${contributor.login}`}
                        className="flex items-center gap-2 hover:bg-accent/50 px-2 py-1.5 rounded-lg transition-colors"
                    >
                        <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="w-7 h-7 rounded-full flex-shrink-0"
                        />
                        <span className="text-xs text-foreground truncate flex-1">
                            {contributor.login}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex-shrink-0">
                            {contributor.contributions.toLocaleString()} commits
                        </span>
                    </Link>
                ))
            ) : (
                <span className="text-xs text-foreground truncate flex-1">
                    No contributors
                </span>
            )}
        </div>
    );
}
