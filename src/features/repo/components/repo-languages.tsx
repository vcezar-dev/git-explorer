'use client';

import { useRepoLanguages } from '../api/get-repo';

interface RepoLanguagesProps {
    owner: string;
    name: string;
}

const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    'C++': '#f34b7d',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    CSS: '#563d7c',
    HTML: '#e34c26',
};

export function RepoLanguages({ owner, name }: RepoLanguagesProps) {
    const { data, isLoading } = useRepoLanguages(owner, name);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2">
                <div className="h-2 w-full bg-secondary rounded-full animate-pulse" />
                <div className="flex flex-col gap-1.5 mt-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="h-3 w-20 bg-secondary rounded animate-pulse" />
                            <div className="h-3 w-8 bg-secondary rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data) return null;

    const total = Object.values(data).reduce((a, b) => a + b, 0);
    const languages = Object.entries(data)
        .map(([lang, bytes]) => ({
            name: lang,
            bytes,
            percentage: Math.round((bytes / total) * 100),
            color: languageColors[lang] ?? '#888',
        }))
        .sort((a, b) => b.bytes - a.bytes);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex w-full h-2 rounded-full overflow-hidden gap-px">
                {languages.map((lang) => (
                    <div
                        key={lang.name}
                        style={{
                            width: `${lang.percentage}%`,
                            background: lang.color,
                        }}
                        title={`${lang.name}: ${lang.percentage}%`}
                    />
                ))}
            </div>

            <div className="flex flex-col gap-1.5">
                {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: lang.color }}
                            />
                            {lang.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {lang.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}