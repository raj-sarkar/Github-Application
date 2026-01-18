import { Link } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import {
    Box as MuiBox,
    Stack as MuiStack,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography';

import { StyledStack } from './Footer.styles';
import type { LinkIconItem, LinkTextItem } from './Footer.types';

/**
 * Container to render elements of footer
 * @returns JSX Element
 */
export const Footer = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const linkTextData: LinkTextItem[] = [
        {
            id: 'item-1',
            text: 'Terms',
            link: '#',
        },
        {
            id: 'item-2',
            text: 'Privacy',
            link: '#',
        },
        {
            id: 'item-3',
            text: 'Security',
            link: '#',
        },
        {
            id: 'item-4',
            text: 'Status',
            link: '#',
        },
        {
            id: 'item-5',
            text: 'Docs',
            link: '#',
        },
        {
            id: 'item-6',
            text: 'Community',
            link: '#',
        },
    ];

    const linkIconData: LinkIconItem[] = [
        {
            id: 'x',
            icon: XIcon,
            link: 'https://x.com/',
            label: 'visit twitter',
        },
        {
            id: 'linkedin',
            icon: LinkedInIcon,
            link: 'https://linkedin.com/',
            label: 'visit linkedin',
        },
    ];

    return (
        <MuiBox padding={isDesktop ? 6 : 4}>
            <StyledStack
                direction={isDesktop ? 'row' : 'column'}
                justifyContent="space-between"
                gap={4}
            >
                <MuiStack
                    direction="row"
                    alignItems="center"
                    gap={4}
                    flexWrap="wrap"
                >
                    <Icon
                        icon={GitHubIcon}
                        size="md"
                        iconColor={theme.palette.grey[600]}
                    />
                    <Typography variant="body1">&copy; Github Inc. </Typography>
                    {linkTextData.map((item) => (
                        <Link to={item.link} key={item.id}>
                            <Typography variant="body1">{item.text}</Typography>
                        </Link>
                    ))}
                </MuiStack>
                <MuiStack direction="row" gap={4}>
                    {linkIconData.map((item) => (
                        <Link
                            to={item.link}
                            key={item.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                        >
                            <Icon icon={item.icon} />
                        </Link>
                    ))}
                </MuiStack>
            </StyledStack>
        </MuiBox>
    );
};
