import { api } from '@/lib/api-client';
import { GithubRepo, GithubLanguages, GithubReadme } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getRepo = (owner: string, name: string): Promise<GithubRepo> => {
    return api.get(`/repos/${owner}/${name}`);
};

export const getRepoLanguages = (
    owner: string,
    name: string,
): Promise<GithubLanguages> => {
    return api.get(`/repos/${owner}/${name}/languages`);
};

export const getRepoReadme = (
    owner: string,
    name: string,
): Promise<GithubReadme> => {
    return api.get(`/repos/${owner}/${name}/readme`);
};

export const getRepoQueryOptions = (owner: string, name: string) =>
    queryOptions({
        queryKey: ['repo', owner, name],
        queryFn: () => getRepo(owner, name),
        staleTime: 1000 * 60 * 5,
    });

export const getRepoLanguagesQueryOptions = (owner: string, name: string) =>
    queryOptions({
        queryKey: ['repo-languages', owner, name],
        queryFn: () => getRepoLanguages(owner, name),
        staleTime: 1000 * 60 * 5,
    });

export const getRepoReadmeQueryOptions = (owner: string, name: string) =>
    queryOptions({
        queryKey: ['repo-readme', owner, name],
        queryFn: () => getRepoReadme(owner, name),
        staleTime: 1000 * 60 * 5,
    });

export const useRepo = (owner: string, name: string) =>
    useQuery(getRepoQueryOptions(owner, name));

export const useRepoLanguages = (owner: string, name: string) =>
    useQuery(getRepoLanguagesQueryOptions(owner, name));

export const useRepoReadme = (owner: string, name: string) =>
    useQuery(getRepoReadmeQueryOptions(owner, name));
