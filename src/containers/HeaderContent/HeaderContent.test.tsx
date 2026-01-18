import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HeaderContent } from './HeaderContent.container';

describe('HeaderContent container test', () => {
    it('checks if all elements renders correctly', () => {
        render(
            <Providers>
                <HeaderContent isDesktop={true} showLoginButton={true} />
            </Providers>,
        );

        expect(screen.getByTestId('SettingsIcon')).toBeInTheDocument();
        expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.queryByText('Toggle Theme')).not.toBeInTheDocument();
        expect(screen.queryByText('Log In')).not.toBeInTheDocument();
    });

    it('checks popover content renders on click', async () => {
        render(
            <Providers>
                <HeaderContent isDesktop={true} showLoginButton={true} />
            </Providers>,
        );

        const settings = screen.getByTestId('SettingsIcon');
        expect(settings).toBeInTheDocument();

        await userEvent.click(settings);
        expect(screen.queryByText('Toggle Theme')).toBeInTheDocument();
        expect(screen.queryByText('Log In')).toBeInTheDocument();
    });
});
