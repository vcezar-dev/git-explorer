'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTrending } from '../../trending/api/get-trending';
import { usePopular } from '../api/get-popular';
import { IconStar, IconGitFork, IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    'C++': '#f34b7d',
};

function RepoCard({ repo }: { repo: any }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={`/repo/${repo.full_name}`}>
            <motion.div
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                animate={{ width: hovered ? 360 : 300 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="shrink border border-border rounded-xl p-4 flex flex-col bg-background cursor-pointer"
                style={{
                    borderColor: hovered
                        ? 'var(--accent-blue-border)'
                        : undefined,
                    height: '200px',
                }}
            >
                <div className="flex items-center gap-3 mb-3 min-w-0">
                    <img
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        className="w-8 h-8 rounded-full shrink object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate leading-tight">
                            {repo.name}
                        </p>
                        <p
                            className="text-xs truncate leading-tight"
                            style={{ color: 'var(--accent-blue)' }}
                        >
                            {repo.owner.login}
                        </p>
                    </div>
                </div>

                {repo.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                        {repo.description}
                    </p>
                )}
                {repo.topics?.length > 0 && (
                    <div className="flex gap-1 mb-2 overflow-hidden">
                        {repo.topics.slice(0, 3).map((topic: string) => (
                            <span
                                key={topic}
                                className="text-[11px] px-2 py-0.5 rounded-full shrink max-w-22.5 truncate"
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

                <motion.div
                    animate={{
                        opacity: hovered ? 1 : 0,
                        height: hovered ? 'auto' : 0,
                    }}
                    transition={{
                        opacity: {
                            duration: 0.25,
                            ease: 'easeOut',
                            delay: hovered ? 0.1 : 0,
                        },
                        height: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                            delay: hovered ? 0 : 0.2,
                        },
                    }}
                    className="overflow-hidden shrink"
                />

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                    {repo.language && (
                        <span className="flex items-center gap-1.5">
                            <span
                                className="w-2 h-2 rounded-full shrink"
                                style={{
                                    background:
                                        languageColors[repo.language] ?? '#888',
                                }}
                            />
                            <span className="text-xs">{repo.language}</span>
                        </span>
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                        <span className="flex items-center gap-1">
                            <IconStar size={13} />
                            {repo.stargazers_count.toLocaleString()}
                        </span>
                        <motion.span
                            animate={{
                                opacity: hovered ? 1 : 0,
                                width: hovered ? 'auto' : 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: 'easeOut',
                                delay: hovered ? 0.1 : 0,
                            }}
                            className="flex items-center gap-1 overflow-hidden whitespace-nowrap"
                        >
                            <IconGitFork size={13} />
                            {repo.forks_count.toLocaleString()}
                        </motion.span>
                        <motion.span
                            animate={{
                                opacity: hovered ? 1 : 0,
                                width: hovered ? 'auto' : 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: 'easeOut',
                                delay: hovered ? 0.1 : 0,
                            }}
                            className="flex items-center gap-1 overflow-hidden whitespace-nowrap"
                        >
                            <IconAlertCircle size={13} />
                            {repo.open_issues_count.toLocaleString()}
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

function MarqueeRow({
    repos,
    direction,
    label,
}: {
    repos: any[];
    direction: 'left' | 'right';
    label: string;
}) {
    const [paused, setPaused] = useState(false);
    const doubled = [...repos, ...repos];
    const duration = repos.length * 5;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-6">
                {label}
            </p>
            <div
                className="overflow-hidden relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10"
                    style={{
                        background:
                            'linear-gradient(to right, var(--background), transparent)',
                    }}
                />
                <div
                    className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10"
                    style={{
                        background:
                            'linear-gradient(to left, var(--background), transparent)',
                    }}
                />
                <div
                    className="flex gap-3 w-max py-1"
                    style={{
                        animation: `marquee-${direction} ${duration}s linear infinite`,
                        animationPlayState: paused ? 'paused' : 'running',
                    }}
                >
                    {doubled.map((repo, i) => (
                        <RepoCard key={`${repo.id}-${i}`} repo={repo} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function RowSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-28 mx-6" />
            <div className="flex gap-3 overflow-hidden px-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-75 shrink border border-border rounded-xl p-4 flex flex-col"
                        style={{ height: '200px' }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Skeleton className="w-8 h-8 rounded-full shrink" />
                            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                <Skeleton className="h-3.5 w-3/4" />
                                <Skeleton className="h-3 w-1/3" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 mb-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-4/5" />
                        </div>

                        <div className="flex gap-1">
                            <Skeleton className="h-4 w-14 rounded-full" />
                            <Skeleton className="h-4 w-16 rounded-full" />
                            <Skeleton className="h-4 w-12 rounded-full" />
                        </div>

                        <div className="flex items-center gap-2 mt-auto">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-10 ml-auto" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function HeroRepos() {
    const { data: trending, isLoading: loadingTrending } = useTrending({
        period: 'weekly',
        per_page: 20,
    });
    const { data: popular, isLoading: loadingPopular } = usePopular();

    return (
        <div className="flex flex-col gap-6">
            {loadingTrending ? (
                <RowSkeleton />
            ) : (
                <MarqueeRow
                    repos={trending?.items ?? []}
                    direction="left"
                    label="Trending this week"
                />
            )}
            {loadingPopular ? (
                <RowSkeleton />
            ) : (
                <MarqueeRow
                    repos={popular?.items ?? []}
                    direction="right"
                    label="Most starred"
                />
            )}
        </div>
    );
}
