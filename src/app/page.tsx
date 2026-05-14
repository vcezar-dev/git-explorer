import Link from 'next/link';
import {
    IconTrendingUp,
    IconSearch,
    IconBrandGithub,
} from '@tabler/icons-react';
import { HeroRepos } from '@/features/home/components/hero-repos';

export default function Home() {
    return (
        <div className="relative min-h-[calc(100vh-56px)] flex flex-col">
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <div
                    className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl"
                    style={{ background: 'var(--accent-blue-subtle)' }}
                />
            </div>

            <div className="relative flex flex-col items-center text-center pt-20 pb-16 px-6">
                <div
                    className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border mb-6"
                    style={{
                        borderColor: 'var(--accent-blue-border)',
                        color: 'var(--accent-blue)',
                        background: 'var(--accent-blue-subtle)',
                    }}
                >
                    <IconBrandGithub size={13} />
                    Powered by GitHub API
                </div>

                <h1 className="text-4xl font-medium text-foreground tracking-tight mb-4 max-w-xl">
                    Explore the GitHub universe
                </h1>
                <p className="text-base text-muted-foreground max-w-md leading-relaxed mb-10">
                    Discover trending repositories, search for projects and
                    developers across the entire GitHub ecosystem.
                </p>

                <div className="flex items-center gap-3">
                    <Link
                        href="/trending"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors text-white"
                        style={{ background: 'var(--accent-blue)' }}
                    >
                        <IconTrendingUp size={15} />
                        Explore Trending
                    </Link>
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-border bg-background hover:bg-secondary transition-colors text-foreground"
                    >
                        <IconSearch size={15} />
                        Search Repos
                    </Link>
                </div>
            </div>

            <div className="relative w-full pb-16 overflow-hidden">
                <HeroRepos />
            </div>
        </div>
    );
}
