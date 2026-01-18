import { Providers } from '../../test';

import PersonIcon from '@mui/icons-material/Person';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputField } from './InputField.component';

describe('InputField component test', () => {
    it('checks if input field is rendred', () => {
        const inputItem = {
            id: 'input-1',
            placeholder: 'Username',
            icon: PersonIcon,
            onChange: () => {},
            error: '',
        };

        render(
            <Providers>
                <InputField inputFieldItem={inputItem} />
            </Providers>,
        );

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    });

    it('checks if user can type in input field', async () => {
        const inputItem = {
            id: 'input-1',
            placeholder: 'Username',
            icon: PersonIcon,
            onChange: () => {},
            error: '',
        };

        render(
            <Providers>
                <InputField inputFieldItem={inputItem} />
            </Providers>,
        );

        const input = screen.getByPlaceholderText('Username');
        await userEvent.type(input, 'something');

        expect(input).toHaveValue('something');
    });
});
