import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';

import { Table } from './Table.component';
import type { TableColumnDef } from './Table.types';

describe('Table component test', () => {
    type Item = {
        id: string;
        name: string;
        email: string;
    };

    const columnDef: TableColumnDef<Item>[] = [
        {
            columnName: 'Name',
            rowRenderer: (value) => value.name,
        },
        {
            columnName: 'Email',
            rowRenderer: (value) => value.email,
        },
    ];

    const tableData: Item[] = [
        {
            id: 'person-1',
            name: 'Raj',
            email: 'raj@gmail.com',
        },
    ];

    it('checks if elements are rendred correctly', () => {
        render(
            <Providers>
                <Table
                    columnDef={columnDef}
                    data={tableData}
                    isLoading={false}
                    nullText="No person"
                />
            </Providers>,
        );

        expect(screen.getByText('NAME')).toBeInTheDocument();
        expect(screen.getByText('EMAIL')).toBeInTheDocument();
        expect(screen.getByText('Raj')).toBeInTheDocument();
        expect(screen.getByText('raj@gmail.com')).toBeInTheDocument();
    });

    it('checks if null text is showing when table is empty', () => {
        render(
            <Providers>
                <Table
                    columnDef={[]}
                    data={[]}
                    isLoading={false}
                    nullText="No person"
                />
            </Providers>,
        );

        expect(screen.getByText('No person')).toBeInTheDocument();
    });
});
