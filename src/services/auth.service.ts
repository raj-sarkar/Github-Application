import { api } from '@api';
import { ModifiedSingleUser, SingleUser } from '@models';
import { singleUserToModifiedSingleUser } from '@utils';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query<ModifiedSingleUser, string>({
            query: (pat) => ({
                url: 'user',
                method: 'GET',
                headers: {
                    Authorization: `token ${pat}`,
                },
            }),
            transformResponse: (res: SingleUser) =>
                singleUserToModifiedSingleUser(res),
        }),
    }),
});

export const { useLazyLoginQuery } = authApi;
