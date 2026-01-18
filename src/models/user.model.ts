/**
 * Represents a simplified GitHub user object returned from the GitHub API.
 * Contains essential profile links and identifying information where keys are in snake_case
 */
export type User = {
    avatar_url: string;
    followers_url: string;
    following_url: string;
    html_url: string;
    id: number;
    login: string;
    repos_url: string;
    url: string;
};

/**
 * Represents a simplified user object after being modified or mapped
 * from the original `User` model.
 * It uses a **camelCase** naming convention for properties
 */
export type ModifiedUser = {
    name: string;
    id: number;
    url: string;
    reposURL: string;
    avatarURL: string;
    followersURL: string;
    followingURL: string;
};

/**
 * Represents a full user object as returned by the GitHub REST API's
 * It includes detailed profile information like bio, location, and follower counts.
 * Keys are in snake_case
 */
export type SingleUser = {
    login: string;
    id: number;
    avatar_url: string;
    followers_url: string;
    following_url: string;
    repos_url: string;
    name: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    html_url: string;
};

/**
 * Represents a single user object after being modified or mapped
 * from the original 'SingleUser' model.
 * It uses a **camelCase** naming convention for properties
 */
export type ModifiedSingleUser = {
    username: string;
    name: string | null;
    id: number;
    avatarURL: string;
    url: string;
    followersURL: string;
    followingURL: string;
    reposURL: string;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    followers: number;
    following: number;
    createdAt: string;
    updatedAt: string;
};
