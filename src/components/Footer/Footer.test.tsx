import { Providers } from '../../test/Providers';

import { render, screen } from '@testing-library/react';

import { Footer } from './Footer.component';

describe('Footer component testing', () => {
    it('test if every element is rendered correctly', () => {
        render(
            <Providers>
                <Footer />
            </Providers>,
        );

        expect(screen.getByText('Terms')).toBeInTheDocument();
        expect(screen.getByText('Privacy')).toBeInTheDocument();
        expect(screen.getByText('Security')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Docs')).toBeInTheDocument();
        expect(screen.getByText('Community')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'visit twitter' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'visit linkedin' }),
        ).toBeInTheDocument();
    });
});
