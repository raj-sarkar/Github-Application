import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store';

const endpointsWithHeader = [
    'getUsers',
    'getRandomUsers',
    'getUser',
    'followUser',
    'unfollowUser',
    'checkFollowed',
    'getRepos',
    'getFollowers',
    'getFollowing',
    'getFollowingsOfAuthenticatedUser',
];

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/',
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = (getState() as RootState).auth.authToken;

            if (token && endpointsWithHeader.includes(endpoint)) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});
