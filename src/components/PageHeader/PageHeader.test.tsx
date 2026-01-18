import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PageHeader } from './PageHeader.component';

describe('PageHeader component test', () => {
    it('checks if elements are rendered successfully', async () => {
        const handleClick = vi.fn();

        render(
            <Providers>
                <PageHeader
                    heading="Heading"
                    description="Description"
                    hasButton={true}
                    buttonText="click me"
                    handleClick={handleClick}
                />
            </Providers>,
        );

        expect(screen.getByText('Heading')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();

        const btn = screen.getByRole('button');
        await userEvent.click(btn);

        expect(handleClick).toBeCalled();
    });
});
