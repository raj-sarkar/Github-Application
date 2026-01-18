import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTE_ACCESS_MAP, ROUTE_ACCESS_VARIANTS, ROUTE_PATH } from '@constant';
import { useAppSelector } from '@hooks';
import { Layout } from '@layout';

/**
 *
 * @returns component that handles the routes accessibility
 */
export const ProtectedRoute = () => {
    const currentPath = useLocation();
    const authUser = useAppSelector((state) => state.auth.authUser);

    const type =
        ROUTE_ACCESS_MAP[currentPath.pathname as keyof typeof ROUTE_ACCESS_MAP]
            ?.type ?? null;

    const showLoginButton = currentPath.pathname !== ROUTE_PATH.LOGIN;

    if (type === ROUTE_ACCESS_VARIANTS.PUBLIC) {
        return !authUser ? (
            <Layout showLoginButton={showLoginButton}>
                <Outlet />
            </Layout>
        ) : (
            <Navigate to={ROUTE_PATH.SUGGESTIONS} />
        );
    }

    if (type === ROUTE_ACCESS_VARIANTS.PRIVATE) {
        return authUser ? (
            <Layout>
                <Outlet />
            </Layout>
        ) : (
            <Navigate to={ROUTE_PATH.LOGIN} />
        );
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};
