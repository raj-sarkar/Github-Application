import { Box as MuiBox, Stack as MuiStack } from '@mui/material';

import { StyledBox, StyledSkeleton } from './SuggestedUser.styles';

/**
 * Skeleton of a suggested user information
 * @returns JSX Element
 */
export const SuggestedUserSkeleton = () => (
    <StyledBox>
        <MuiStack direction="row" gap={2} alignItems="center">
            <StyledSkeleton variant="circular" width={40} height={40} />
            <MuiBox>
                <StyledSkeleton variant="text" width={100} height={24} />
                <StyledSkeleton variant="text" width={100} height={24} />
                <MuiStack direction="row" gap={2} alignItems="center">
                    <StyledSkeleton variant="text" width={70} height={40} />
                    <StyledSkeleton variant="text" width={30} height={40} />
                </MuiStack>
            </MuiBox>
        </MuiStack>
        <StyledSkeleton variant="text" width="80%" height={24} />
        <StyledSkeleton variant="text" width="80%" height={24} />
        <StyledSkeleton variant="text" width="40%" height={24} />
        <StyledSkeleton variant="text" width="40%" height={24} />
        <StyledSkeleton variant="text" width="80%" height={24} />
        <StyledSkeleton variant="text" width="90%" height={40} />
    </StyledBox>
);
