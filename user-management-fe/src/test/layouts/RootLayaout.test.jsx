import { describe, test, expect } from 'vitest';
import { renderWithProviders } from '../utils/renderWithProviders';
import { screen } from '@testing-library/react';

import RootLayout from '../../layouts/RootLayout.jsx';

describe('RootLayout', () => {
    test('it should render title and children', () => {
        renderWithProviders(
            <RootLayout>
                <div data-testid="test-content">Test</div>
            </RootLayout>
        );

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });
});
