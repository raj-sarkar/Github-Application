import CachedIcon from '@mui/icons-material/Cached';
import { Stack as MuiStack, useTheme } from '@mui/material';

import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography';

import type { PageHeaderProps } from './PageHeader.types';

/**
 * Component to render the heading, description and button of a page
 * @param props - Props for Page header component;
 * @param props.heading - heading of page
 * @param props.isLoading - true if loading state is active
 * @param props.description - description of page
 * @param props.hasButton - true if there is refresh button
 * @param props.handleClick - function to handle click on refresh button
 * @param props.buttonText - text to show inside button
 * @returns JSX Element
 */
export const PageHeader = (props: PageHeaderProps) => {
    const {
        heading,
        description,
        hasButton,
        handleClick,
        isLoading,
        buttonText,
    } = props;

    const theme = useTheme();

    return (
        <MuiStack gap={4}>
            <Typography variant="h1" lines={3}>
                {heading}
            </Typography>
            <Typography variant="h2" lines={6} color={theme.palette.grey[500]}>
                {description}
            </Typography>
            {hasButton && buttonText && handleClick && (
                <Button
                    onClick={() => void handleClick()}
                    backgroundColor={theme.palette.grey[700]}
                    disabled={isLoading}
                >
                    <MuiStack direction="row" gap={2}>
                        <Typography
                            variant="h4"
                            color={
                                isLoading
                                    ? theme.palette.grey[400]
                                    : theme.palette.background.default
                            }
                        >
                            {buttonText}
                        </Typography>
                        <Icon
                            icon={CachedIcon}
                            iconColor={
                                isLoading
                                    ? theme.palette.grey[400]
                                    : theme.palette.background.default
                            }
                        />
                    </MuiStack>
                </Button>
            )}
        </MuiStack>
    );
};
