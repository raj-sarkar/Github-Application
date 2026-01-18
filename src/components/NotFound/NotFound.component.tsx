import { Box as MuiBox, Stack as MuiStack, useTheme } from '@mui/material';

import { Button } from '@components/Button';
import { Typography } from '@components/Typography';

import type { NotFoundProps } from './NotFound.types';

/**
 * Component to show elements for not found
 * @param props - Props for not found component
 * @param props.isDesktop - true if view width is desktop
 * @param props.imgSrc - src of image
 * @param props.heading - heading for the page
 * @param props.description - description of the page
 * @param props.buttonText - text in the button
 * @param props.onClick - function to handle the button click
 * @returns JSX Element
 */
export const NotFound = (props: NotFoundProps) => {
    const { isDesktop, imgSrc, heading, description, buttonText, onClick } =
        props;

    const theme = useTheme();

    return (
        <MuiStack alignItems="center" gap={6}>
            <img
                src={imgSrc}
                width={isDesktop ? '30%' : '90%'}
                alt="Not found"
            />
            <MuiBox textAlign="center">
                <Typography variant="h1" lines={5}>
                    {heading}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color={theme.palette.grey[500]}
                    lines={5}
                >
                    {description}
                </Typography>
            </MuiBox>
            {buttonText && onClick && (
                <Button onClick={onClick}>
                    <Typography variant="h3" color={theme.palette.grey[50]}>
                        {buttonText}
                    </Typography>
                </Button>
            )}
        </MuiStack>
    );
};
