import { api } from '@/lib/api-client';
import { GithubSearchRepos } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getPopular = (): Promise<GithubSearchRepos> => {
    return api.get('/search/repositories', {
        params: {
            q: 'stars:>50000',
            sort: 'stars',
            order: 'desc',
            per_page: 20,
        },
    });
};

export const getPopularQueryOptions = () => {
    return queryOptions({
        queryKey: ['popular'],
        queryFn: () => getPopular(),
        staleTime: 1000 * 60 * 60,
    });
};

export const usePopular = () => {
    return useQuery(getPopularQueryOptions());
};
