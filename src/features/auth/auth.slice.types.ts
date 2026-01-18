import { ModifiedSingleUser } from '@models';

/**
 * Types for auth state
 * @property authUser - authenticated user details
 * @property authToken - Personal Access Token
 */
export type AuthState = {
    authUser: ModifiedSingleUser | null;
    authToken: string | null;
};
