import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { FollowingState } from './following.types';

const initialState: FollowingState = {
    followingUsers: [],
};

export const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        setFollowingList: (
            _,
            action: PayloadAction<{ following: string[] }>,
        ) => {
            const { following } = action.payload;
            return {
                followingUsers: following,
            };
        },
    },
});

export const { setFollowingList } = followingSlice.actions;

export default followingSlice.reducer;
