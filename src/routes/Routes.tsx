import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTE_ACCESS_MAP, ROUTE_PATH } from '@constant';
import { ProtectedRoute } from '@protectedRoute';

export const routes = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ROUTE_PATH.HOME,
                element: ROUTE_ACCESS_MAP[ROUTE_PATH.HOME].component,
            },
            {
                path: ROUTE_PATH.LOGIN,
                element: ROUTE_ACCESS_MAP[ROUTE_PATH.LOGIN].component,
            },
            {
                path: ROUTE_PATH.SUGGESTIONS,
                element: ROUTE_ACCESS_MAP[ROUTE_PATH.SUGGESTIONS].component,
            },
            {
                path: ROUTE_PATH.PROFILE,
                element: ROUTE_ACCESS_MAP[ROUTE_PATH.PROFILE].component,
            },
            {
                path: ROUTE_PATH.FOLLOWING,
                element: ROUTE_ACCESS_MAP[ROUTE_PATH.FOLLOWING].component,
            },
            {
                path: ROUTE_PATH.FOLLOWERS,
                element: ROUTE_ACCESS_MAP[ROUTE_PATH.FOLLOWERS].component,
            },
            {
                path: ROUTE_PATH.NOT_FOUND,
                element: ROUTE_ACCESS_MAP[ROUTE_PATH.NOT_FOUND].component,
            },
            {
                path: '*',
                element: <Navigate to={ROUTE_PATH.NOT_FOUND} replace />,
            },
        ],
    },
]);
