import { Providers } from '../../test';

import { Mock } from 'vitest';

import { Snackbar } from '@containers/Snackbar';
import * as appHooks from '@hooks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm.container';

const mockState = {
    snackbar: {
        open: true,
        message: 'mes',
        severity: 'info',
        autoHideDuration: 2000,
    },
};

const handleShowSnackbar = (message: string = '') => {
    mockState.snackbar.message = message;
    mockState.snackbar.autoHideDuration = 2000;
    mockState.snackbar.open = true;
};

const mockDispatch = vi.fn();

vi.mock('../../hooks/store', () => ({
    useAppSelector: vi.fn(),
    useAppDispatch: () => mockDispatch,
}));

type Selector<T> = (state: typeof mockState) => T;

describe('login form test', () => {
    (appHooks.useAppSelector as Mock).mockImplementation(
        <T,>(selector: Selector<T>) => selector(mockState),
    );
    vi.spyOn(appHooks, 'useAppDispatch').mockReturnValue(mockDispatch);

    it('it shows username is required message when username is empty', async () => {
        render(
            <Providers>
                <LoginForm isDesktop={true} />
            </Providers>,
        );
        const submitButton = screen.getByRole('button', { name: 'Log in' });
        await userEvent.click(submitButton);
        expect(screen.getByText('Username is required')).toBeInTheDocument();
    });

    it('it shows token is required message when only token is empty', async () => {
        render(
            <Providers>
                <LoginForm isDesktop={true} />
            </Providers>,
        );
        const submitButton = screen.getByRole('button', { name: 'Log in' });
        const usernameInput = screen.getByPlaceholderText('Username');
        await userEvent.type(usernameInput, 'rajsarkar0641');
        await userEvent.click(submitButton);
        expect(screen.getByText('Token is required')).toBeInTheDocument();
    });

    it('it shows invalid credentials when credentials are incorrect', async () => {
        render(
            <Providers>
                <LoginForm isDesktop={true} />
                <Snackbar />
            </Providers>,
        );
        const submitButton = screen.getByRole('button', { name: 'Log in' });
        const usernameInput = screen.getByPlaceholderText('Username');
        const tokenInput = screen.getByPlaceholderText('Token');
        await userEvent.type(usernameInput, 'rajsarkar');
        await userEvent.type(tokenInput, 'abcd123');
        await userEvent.click(submitButton);
        handleShowSnackbar('Invalid credentials');

        render(<Snackbar />);

        expect(
            await screen.findByText('Invalid credentials'),
        ).toBeInTheDocument();
    });

    it('it logs in the user when credentials are correct', async () => {
        render(
            <Providers>
                <LoginForm isDesktop={true} />
                <Snackbar />
            </Providers>,
        );
        const submitButton = screen.getByRole('button', { name: 'Log in' });
        const usernameInput = screen.getByPlaceholderText('Username');
        const tokenInput = screen.getByPlaceholderText('Token');
        await userEvent.type(usernameInput, 'rajsarkar');
        await userEvent.type(tokenInput, 'abcd123');
        await userEvent.click(submitButton);
        handleShowSnackbar('Logged in successfully');

        render(<Snackbar />);

        expect(
            await screen.findByText('Logged in successfully'),
        ).toBeInTheDocument();
    });
});
