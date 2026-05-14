import type { Endpoints } from '@octokit/types';

export type GithubUser = Endpoints['GET /users/{username}']['response']['data'];
export type GithubRepo =
    Endpoints['GET /repos/{owner}/{repo}']['response']['data'];
export type GithubSearchRepos =
    Endpoints['GET /search/repositories']['response']['data'];
export type GithubSearchUsers =
    Endpoints['GET /search/users']['response']['data'];
export type GithubLanguages =
    Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data'];
export type GithubReadme =
    Endpoints['GET /repos/{owner}/{repo}/readme']['response']['data'];
export type GithubUserRepos =
    Endpoints['GET /users/{username}/repos']['response']['data'];

export type GithubContributors =
    Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data'];
