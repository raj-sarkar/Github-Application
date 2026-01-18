import { Providers } from '../../test';

import { Mock } from 'vitest';

import { useAppSelector } from '@hooks';
import { render, screen } from '@testing-library/react';

import { Snackbar } from './Snackbar.container';

const mockDispatch = vi.fn();

vi.mock('../../hooks/store', () => ({
    useAppSelector: vi.fn(),
    useAppDispatch: () => mockDispatch,
}));

const mockState = {
    snackbar: {
        open: true,
        message: 'message in snackbar',
        severity: 'error',
        autoHideDuration: 3000,
    },
};

type Selector<T> = (state: typeof mockState) => T;

describe('Snackbar container tests', () => {
    it('checks if snackbar is rendered with message', async () => {
        (useAppSelector as Mock).mockImplementation(
            <T,>(selector: Selector<T>) => selector(mockState),
        );

        render(
            <Providers>
                <Snackbar />
            </Providers>,
        );

        expect(
            await screen.findByText('message in snackbar'),
        ).toBeInTheDocument();
    });
});
