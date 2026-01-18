import { Navigate } from 'react-router-dom';

import { Followers } from '@pages/Followers';
import { Following } from '@pages/Following';
import { Login } from '@pages/Login';
import { NotFound } from '@pages/NotFound';
import { Profile } from '@pages/Profile';
import { Suggestions } from '@pages/Suggestions';

export const ROUTE_PATH = {
    HOME: '/',
    SUGGESTIONS: '/suggestions',
    PROFILE: '/profile/:username',
    FOLLOWING: '/following/:username',
    FOLLOWERS: '/followers/:username',
    LOGIN: '/login',
    NOT_FOUND: '/not-found',
} as const;

export const ROUTE_ACCESS_VARIANTS = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    OPEN: 'open',
} as const;

export const ROUTE_ACCESS_MAP = {
    [ROUTE_PATH.HOME]: {
        type: ROUTE_ACCESS_VARIANTS.OPEN,
        component: <Navigate to={ROUTE_PATH.SUGGESTIONS} />,
    },
    [ROUTE_PATH.LOGIN]: {
        type: ROUTE_ACCESS_VARIANTS.PUBLIC,
        component: <Login />,
    },
    [ROUTE_PATH.SUGGESTIONS]: {
        type: ROUTE_ACCESS_VARIANTS.PRIVATE,
        component: <Suggestions />,
    },
    [ROUTE_PATH.PROFILE]: {
        type: ROUTE_ACCESS_VARIANTS.OPEN,
        component: <Profile />,
    },
    [ROUTE_PATH.FOLLOWING]: {
        type: ROUTE_ACCESS_VARIANTS.OPEN,
        component: <Following />,
    },
    [ROUTE_PATH.FOLLOWERS]: {
        type: ROUTE_ACCESS_VARIANTS.OPEN,
        component: <Followers />,
    },
    [ROUTE_PATH.NOT_FOUND]: {
        type: ROUTE_ACCESS_VARIANTS.OPEN,
        component: <NotFound />,
    },
} as const;
