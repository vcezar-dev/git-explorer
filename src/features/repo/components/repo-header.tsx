'use client';

import { useEffect, useState } from 'react';
import { useRepo } from '../api/get-repo';
import {
    IconStar,
    IconGitFork,
    IconAlertCircle,
    IconEye,
    IconScale,
    IconCalendar,
    IconBrandGithub,
    IconExternalLink,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';

interface RepoHeaderProps {
    owner: string;
    name: string;
}

function TimeAgo({ date }: { date: string }) {
    const [label, setLabel] = useState('');

    useEffect(() => {
        setLabel(formatDistanceToNow(new Date(date), { addSuffix: true }));
    }, [date]);

    if (!label) return null;

    return <span>{label}</span>;
}

export function RepoHeader({ owner, name }: RepoHeaderProps) {
    const { data, isLoading } = useRepo(owner, name);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary animate-pulse" />
                    <div className="flex flex-col gap-1.5">
                        <div className="h-5 w-48 bg-secondary rounded animate-pulse" />
                        <div className="h-3 w-24 bg-secondary rounded animate-pulse" />
                    </div>
                </div>
                <div className="h-4 w-3/4 bg-secondary rounded animate-pulse" />
                <div className="flex gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 w-16 bg-secondary rounded animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex flex-col gap-4 pb-6 border-b border-border">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <a
                        href={`https://github.com/${data.owner.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={data.owner.avatar_url}
                            alt={data.owner.login}
                            className="w-10 h-10 rounded-full hover:opacity-80 transition-opacity"
                        />
                    </a>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <a
                                href={`https://github.com/${data.owner.login}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:underline"
                                style={{ color: 'var(--accent-blue)' }}
                            >
                                {data.owner.login}
                            </a>
                            <span className="text-muted-foreground">/</span>
                            <h1 className="text-lg font-semibold text-foreground">
                                {data.name}
                            </h1>
                        </div>
                        {data.license && (
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <IconScale size={11} />
                                {data.license.name}
                            </span>
                        )}
                    </div>
                </div>

                <a
                    href={data.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
                >
                    <IconBrandGithub size={14} />
                    View on GitHub
                    <IconExternalLink size={12} />
                </a>
            </div>

            {data.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.description}
                </p>
            )}

            {data.topics && data.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {data.topics.map((topic) => (
                        <span
                            key={topic}
                            className="text-[11px] px-2 py-0.5 rounded-full"
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

            <div className="flex items-center gap-5 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5">
                    <IconStar size={14} />
                    {data.stargazers_count.toLocaleString()} stars
                </span>
                <span className="flex items-center gap-1.5">
                    <IconGitFork size={14} />
                    {data.forks_count.toLocaleString()} forks
                </span>
                <span className="flex items-center gap-1.5">
                    <IconEye size={14} />
                    {data.watchers_count.toLocaleString()} watchers
                </span>
                <span className="flex items-center gap-1.5">
                    <IconAlertCircle size={14} />
                    {data.open_issues_count.toLocaleString()} issues
                </span>
                <span className="flex items-center gap-1.5 ml-auto text-xs">
                    <IconCalendar size={13} />
                    Updated <TimeAgo date={data.updated_at} />
                </span>
            </div>
        </div>
    );
}
