import { describe, test, expect } from 'vitest';
import { screen, render } from '@testing-library/react';

import App from '../App.jsx';

describe('App', () => {
    test('renders title from <RootLayout> component', () => {
        render(<App />);
        expect(
            screen.getByRole('heading', {
                name: 'React With Test Driven Development',
            })
        ).toBeInTheDocument();
    });

    test('render title from <LoginPage> component', () => {
        render(<App />);
        expect(
            screen.getByRole('heading', { name: 'Login' })
        ).toBeInTheDocument();
    });
});
