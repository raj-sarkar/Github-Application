import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';

import { Typography } from './Typography.component';

describe('Typography component test', () => {
    it('checks if text is visible', () => {
        render(
            <Providers>
                <Typography>Text</Typography>
            </Providers>,
        );

        expect(screen.getByText('Text')).toBeInTheDocument();
    });
});
