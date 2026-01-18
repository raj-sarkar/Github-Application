import { Providers } from '../../test';

import GitHubIcon from '@mui/icons-material/GitHub';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IconButton } from './IconButton.component';

describe('IconButton component test', () => {
    it('checks if icon button is rendred correctly', () => {
        render(
            <Providers>
                <IconButton icon={GitHubIcon} data-testid="my-icon-btn" />
            </Providers>,
        );

        expect(screen.getByTestId('my-icon-btn')).toBeInTheDocument();
    });

    it('checks if click function is working on icon', async () => {
        const handleClick = vi.fn();
        render(
            <Providers>
                <IconButton
                    icon={GitHubIcon}
                    data-testid="my-icon-btn"
                    onClick={handleClick}
                />
            </Providers>,
        );

        const iconBtn = screen.getByTestId('my-icon-btn');
        await userEvent.click(iconBtn);

        expect(handleClick).toBeCalled();
    });
});
