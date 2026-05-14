'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingPeriod, useTrending } from '../api/get-trending';
import { TrendingCard } from './trending-card';
import { TrendingListItem } from './trending-list-item';
import { TrendingPageSkeleton } from '@/components/layouts/skeleton';

const periods: { label: string; value: TrendingPeriod }[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
];

const languages = ['All', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust'];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export function TrendingList() {
    const [period, setPeriod] = useState<TrendingPeriod>('weekly');
    const [language, setLanguage] = useState<string>('All');

    const { data, isLoading } = useTrending({
        period,
        language: language === 'All' ? undefined : language,
        per_page: 25,
    });

    console.log(data);

    const top3 = data?.items.slice(0, 3) ?? [];
    const rest = data?.items.slice(3) ?? [];

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex gap-1.5">
                    {periods.map((p) => (
                        <button
                            key={p.value}
                            onClick={() => setPeriod(p.value)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                period === p.value
                                    ? 'bg-secondary text-foreground border-border'
                                    : 'border-border text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                language === lang
                                    ? 'bg-secondary text-foreground border-border'
                                    : 'border-border text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TrendingPageSkeleton />
                    </motion.div>
                ) : (
                    <motion.div
                        key={`${period}-${language}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-3">
                            Top 3 this {period}
                        </p>
                        <motion.div
                            className="grid grid-cols-3 gap-3 mb-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {top3.map((repo, i) => (
                                <motion.div
                                    key={repo.id}
                                    variants={itemVariants}
                                >
                                    <TrendingCard repo={repo} rank={i + 1} />
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="h-px bg-border mb-5" />

                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
                            The rest
                        </p>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {rest.map((repo, i) => (
                                <motion.div
                                    key={repo.id}
                                    variants={itemVariants}
                                >
                                    <TrendingListItem
                                        repo={repo}
                                        rank={i + 4}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
