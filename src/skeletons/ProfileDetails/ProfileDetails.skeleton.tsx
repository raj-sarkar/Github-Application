import { Stack as MuiStack } from '@mui/material';

import {
    StyledCircularSkeleton,
    StyledSkeleton,
} from './ProfileDetails.styles';
import type { ProfileDetailsProps } from './ProfileDetails.types';

/**
 * Skeleton to show while profile detail is loading
 * @param props Props for profile details skeleton
 * @param props.isDesktop true if view width is desktop
 * @returns JSX Element
 */
export const ProfileDetailsSkeleton = (props: ProfileDetailsProps) => {
    const { isDesktop } = props;

    return (
        <MuiStack direction={isDesktop ? 'row' : 'column'} gap={4}>
            <MuiStack direction="row" spacing={4} marginBottom={4}>
                <StyledCircularSkeleton variant="circular" />
                <MuiStack gap={isDesktop ? 4 : 2}>
                    <MuiStack gap={2}>
                        <StyledSkeleton
                            width={isDesktop ? 300 : 150}
                            height={isDesktop ? 62 : 24}
                        />
                        <StyledSkeleton
                            width={isDesktop ? 300 : 150}
                            height={isDesktop ? 30 : 20}
                        />
                        <StyledSkeleton width={150} height={24} />
                        <StyledSkeleton width={150} height={24} />
                        <StyledSkeleton width={150} height={24} />
                        <StyledSkeleton width={150} height={24} />
                        <StyledSkeleton width={150} height={24} />
                    </MuiStack>
                </MuiStack>
            </MuiStack>
            <MuiStack flexGrow={2} justifyContent="center" alignItems="center">
                <StyledSkeleton
                    variant="rounded"
                    width={isDesktop ? 200 : 150}
                    height={isDesktop ? 45 : 35}
                />
                <StyledSkeleton width="100%" height={100} />
            </MuiStack>
        </MuiStack>
    );
};
