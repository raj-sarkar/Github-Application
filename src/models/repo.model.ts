export type RepoItem = {
    id: number;
    name: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    visibility: string;
    topics: string[];
    html_url: string;
};

export type ModifiedRepoItem = {
    id: number;
    name: string;
    starsCount: number;
    forksCount: number;
    openIssuesCount: number;
    visibility: string;
    topics: string[];
    htmlURL: string;
};
