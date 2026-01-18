import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NotFound } from './NotFound.component';

describe('NotFound component test', () => {
    it('checks if elements are rendred', async () => {
        const handleClick = vi.fn();
        render(
            <Providers>
                <NotFound
                    isDesktop={true}
                    heading="Heading"
                    description="Desc"
                    imgSrc="src"
                    buttonText="click me"
                    onClick={handleClick}
                />
            </Providers>,
        );

        const btn = screen.getByRole('button');

        expect(screen.getByText('Heading')).toBeInTheDocument();
        expect(screen.getByText('Desc')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(btn).toBeInTheDocument();

        await userEvent.click(btn);
        expect(handleClick).toBeCalled();
    });
});
