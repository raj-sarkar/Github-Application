import { api } from '@api';
import type {
    ModifiedRepoItem,
    ModifiedSingleUser,
    ModifiedUser,
    RepoItem,
    SingleUser,
    User,
} from '@models';
import {
    reposToModifiedRepos,
    singleUserToModifiedSingleUser,
    usersToModifiedUsers,
} from '@utils';

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<ModifiedUser[], string>({
            query: (username) => ({
                url: `search/users?q=${encodeURIComponent(username)}`,
                method: 'GET',
            }),
            transformResponse: (res: { items: User[] }) =>
                usersToModifiedUsers(res.items),
        }),
        getUser: builder.query<ModifiedSingleUser, string>({
            query: (username) => ({
                url: `users/${username}`,
                method: 'GET',
                cache: 'no-store',
            }),
            transformResponse: (res: SingleUser) =>
                singleUserToModifiedSingleUser(res),
        }),
        getRandomUsers: builder.query<
            ModifiedUser[],
            { sinceId: number; perPage: number }
        >({
            query: ({ sinceId, perPage }) => ({
                url: `users?since=${sinceId}&per_page=${perPage}`,
                method: 'GET',
            }),
            transformResponse: (res: User[]) => usersToModifiedUsers(res),
        }),
        followUser: builder.mutation<null, string>({
            query: (username) => ({
                url: `user/following/${username}`,
                method: 'PUT',
            }),
        }),
        unfollowUser: builder.mutation<null, string>({
            query: (username) => ({
                url: `user/following/${username}`,
                method: 'DELETE',
            }),
        }),
        checkFollowed: builder.query<boolean, string>({
            query: (username) => ({
                url: `user/following/${username}`,
                method: 'GET',
                cache: 'no-store',
            }),
            transformResponse: (_, meta) => meta?.response?.status === 204,
        }),
        getRepos: builder.query<ModifiedRepoItem[], string>({
            query: (username) => ({
                url: `users/${username}/repos`,
                method: 'GET',
            }),
            transformResponse: (res: RepoItem[]) => reposToModifiedRepos(res),
        }),
        getFollowers: builder.query<ModifiedUser[], string>({
            query: (username) => ({
                url: `users/${username}/followers?per_page=100`,
                method: 'GET',
                cache: 'no-store',
            }),
            transformResponse: (res: User[]) => usersToModifiedUsers(res),
        }),
        getFollowing: builder.query<ModifiedUser[], string>({
            query: (username) => ({
                url: `users/${username}/following?per_page=100`,
                method: 'GET',
                cache: 'no-store',
            }),
            transformResponse: (res: User[]) => usersToModifiedUsers(res),
        }),
        getFollowingsOfAuthenticatedUser: builder.query<
            ModifiedUser[],
            void | null
        >({
            query: () => ({
                url: 'user/following',
                method: 'GET',
                cache: 'no-store',
            }),
            transformResponse: (res: User[]) => usersToModifiedUsers(res),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useLazyGetRandomUsersQuery,
    useLazyGetUserQuery,
    useUnfollowUserMutation,
    useFollowUserMutation,
    useLazyCheckFollowedQuery,
    useGetReposQuery,
    useLazyGetFollowersQuery,
    useLazyGetFollowingQuery,
    useLazyGetFollowingsOfAuthenticatedUserQuery,
} = userApi;
