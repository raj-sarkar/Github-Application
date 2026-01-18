import {
    ModifiedRepoItem,
    ModifiedSingleUser,
    ModifiedUser,
    RepoItem,
    SingleUser,
    User,
} from '@models';

/**
 *
 * @param error - error from the API
 * @returns error as string
 */
export const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;

    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }

    if (error && typeof error === 'object' && 'data' in error) {
        return JSON.stringify(error.data);
    }

    return 'An unknown error occurred';
};

/**
 * Generates random number
 * @returns number
 */
export const getRandomId = () => Math.floor(Math.random() * 100000);

/**
 * Transforms an array of raw GitHub `User` objects into a simplified array of `ModifiedUser` objects.
 *
 * This function maps each `User` object to a `ModifiedUser` by selecting and renaming
 * only the relevant properties needed by the application.
 *
 * @param users - The list of GitHub API `User` objects to transform.
 * @returns A new array of `ModifiedUser` objects with renamed and filtered fields.
 */
export const usersToModifiedUsers = (users: User[]): ModifiedUser[] =>
    users.map((user) => ({
        name: user.login,
        avatarURL: user.avatar_url,
        followersURL: user.followers_url,
        followingURL: user.following_url,
        id: user.id,
        url: user.html_url,
        reposURL: user.repos_url,
    }));

/**
 * Transforms a detailed GitHub `SingleUser` object into a simplified `ModifiedSingleUser` object.
 *
 * This function is used to normalize user data fetched from the GitHub API,
 * keeping only the relevant fields needed by the application and ensuring
 * optional fields like `name`, `blog`, and `email` are safely set to `null` if missing.
 *
 * @param user - A detailed GitHub user object from the API.
 * @returns A simplified and typed `ModifiedSingleUser` object.
 */
export const singleUserToModifiedSingleUser = (
    user: SingleUser,
): ModifiedSingleUser => ({
    username: user.login,
    name: user.name ?? null,
    id: user.id,
    avatarURL: user.avatar_url,
    url: user.html_url,
    followersURL: user.followers_url,
    followingURL: user.following_url,
    reposURL: user.repos_url,
    blog: user.blog ?? null,
    location: user.location ?? null,
    email: user.email ?? null,
    bio: user.bio ?? null,
    followers: user.followers,
    following: user.following,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
});

/**
 * Converts an array of GitHub repository objects (`RepoItem[]`)
 * into a simplified array of `ModifiedRepoItem` objects for UI or store use.
 *
 * This transformation extracts only the most relevant repository fields,
 * such as name, star count, forks, visibility, and topics.
 *
 * @param repos - The list of repository objects from the GitHub API.
 * @returns A list of simplified repository objects.
 */
export const reposToModifiedRepos = (repos: RepoItem[]): ModifiedRepoItem[] =>
    repos.map((item) => ({
        id: item.id,
        name: item.name,
        starsCount: item.stargazers_count,
        forksCount: item.forks_count,
        openIssuesCount: item.open_issues_count,
        visibility: item.visibility,
        topics: item.topics,
        htmlURL: item.html_url,
    }));
