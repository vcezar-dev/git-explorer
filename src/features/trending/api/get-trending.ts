import { api } from '@/lib/api-client';
import { GithubSearchRepos } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export type TrendingPeriod = 'daily' | 'weekly' | 'monthly';
type TrendingParams = {
    period: TrendingPeriod;
    language?: string;
    per_page?: number;
};

const getPeriodDate = (period: TrendingPeriod): string => {
    const date = new Date();
    const days = { daily: 1, weekly: 7, monthly: 30 };
    date.setDate(date.getDate() - days[period]);
    return date.toISOString().split('T')[0];
};

export const getTrending = (
    params: TrendingParams,
): Promise<GithubSearchRepos> => {
    const since = getPeriodDate(params.period);
    const q = `stars:>1 created:>${since}${params.language ? ` language:${params.language}` : ''}`;

    return api.get('/search/repositories', {
        params: {
            q,
            sort: 'stars',
            order: 'desc',
            per_page: params.per_page ?? 30,
        },
    });
};
export const getTrendingQueryOptions = (params: TrendingParams) => {
    return queryOptions({
        queryKey: ['trending', params],
        queryFn: () => getTrending(params),
        staleTime: 1000 * 60 * 5,
    });
};

export const useTrending = (params: TrendingParams) => {
    return useQuery({ ...getTrendingQueryOptions(params) });
};
