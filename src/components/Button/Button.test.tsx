import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button.component';

describe('Button testing', () => {
    it('button rendering test', () => {
        render(<Button>click</Button>);

        const btn = screen.getByText('click');

        expect(btn).toBeInTheDocument();
    });

    it('button click test', async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>click</Button>);

        const btn = screen.getByText('click');
        await userEvent.click(btn);
        expect(handleClick).toBeCalled();
    });
});
