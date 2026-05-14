import { api } from '@/lib/api-client';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { Endpoints } from '@octokit/types';

export type GithubContributors = Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data'];

export const getContributors = (owner: string, name: string): Promise<GithubContributors> => {
    return api.get(`/repos/${owner}/${name}/contributors`, {
        params: { per_page: 10 },
    });
};

export const getContributorsQueryOptions = (owner: string, name: string) =>
    queryOptions({
        queryKey: ['repo-contributors', owner, name],
        queryFn: () => getContributors(owner, name),
        staleTime: 1000 * 60 * 5,
    });

export const useContributors = (owner: string, name: string) =>
    useQuery(getContributorsQueryOptions(owner, name));