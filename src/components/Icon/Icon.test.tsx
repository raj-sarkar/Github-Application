import { Providers } from '../../test';

import GitHubIcon from '@mui/icons-material/GitHub';

import { render, screen } from '@testing-library/react';

import { Icon } from './Icon.component';

describe('Icon component test', () => {
    it('testing if icon is rendering', () => {
        render(
            <Providers>
                <Icon icon={GitHubIcon} data-testid="my-icon" />
            </Providers>,
        );

        expect(screen.getByTestId('my-icon')).toBeInTheDocument();
    });
});
