import { Providers } from '../../test';

import LogoutIcon from '@mui/icons-material/Logout';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PopoverContent } from './PopoverContent.component';

describe('PopoverContent component test', () => {
    it('checks if elements are rendered successfully', async () => {
        const handleClick = vi.fn();

        const popoverItem = {
            id: 'item-2',
            text: 'Sign out',
            icon: LogoutIcon,
            clickFunction: handleClick,
            show: true,
        };

        render(
            <Providers>
                <PopoverContent popoverItem={popoverItem} />
            </Providers>,
        );

        expect(screen.getByTestId('popover-icon')).toBeInTheDocument();
        expect(screen.getByText('Sign out')).toBeInTheDocument();

        const btn = screen.getByRole('button');
        await userEvent.click(btn);

        expect(handleClick).toBeCalled();
    });
});
