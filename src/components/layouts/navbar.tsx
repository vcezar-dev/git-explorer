// src/components/layouts/navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { IconMoon, IconSun, IconBrandGithub } from '@tabler/icons-react';

const links = [
    { href: '/', label: 'Trending' },
    { href: '/search', label: 'Search' },
];

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold text-foreground"
                    >
                        <IconBrandGithub size={20} />
                        Git Explorer
                    </Link>

                    <nav className="flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-sm px-3 py-1.5 rounded-lg transition-colors',
                                    pathname === link.href
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <button
                    onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Toggle theme"
                >
                    {mounted &&
                        (theme === 'dark' ? (
                            <IconSun size={18} />
                        ) : (
                            <IconMoon size={18} />
                        ))}
                </button>
            </div>
        </header>
    );
}
