import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import LoginPage from '../../pages/LoginPage';

import { renderWithProviders } from '../utils/renderWithProviders';
import { server } from '../mocks/server';

import env from '../../env';

const getButton = () => screen.getByRole('button', { name: /submit/i });
const getEmailInput = () => screen.getByLabelText(/email/i);
const getPasswordInput = () => screen.getByLabelText(/password/i);

const mockServerWithError = status => {
    server.use(
        http.post(`${env.BACKEND_URL}/api/login`, async () => {
            return HttpResponse.json(null, { status });
        })
    );
};

describe('LoginPage', () => {
    test('it should render the login title', () => {
        renderWithProviders(<LoginPage />);

        expect(
            screen.getByRole('heading', { name: /login/i })
        ).toBeInTheDocument();
    });

    test('it should render the form elements', () => {
        renderWithProviders(<LoginPage />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(getButton()).toBeInTheDocument();
    });

    test('it should validate the inputs as required', async () => {
        renderWithProviders(<LoginPage />);

        await userEvent.click(getButton());

        expect(screen.getByText(/The email is required/i)).toBeInTheDocument();
        expect(
            screen.getByText(/The password is required/i)
        ).toBeInTheDocument();
    });

    test('it should validate the email format', async () => {
        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'invalid-email');
        await userEvent.click(getButton());

        expect(screen.getByText(/The email is invalid/i)).toBeInTheDocument();
    });

    test('it should disabled the submit button while is fetching', async () => {
        renderWithProviders(<LoginPage />);

        expect(getButton()).not.toBeDisabled();

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), 'Password1!');
        await userEvent.click(getButton());

        expect(getButton()).toBeDisabled();
        expect(
            screen.queryByText(/The email is invalid/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/The email is required/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/The password is required/i)
        ).not.toBeInTheDocument();
        expect(getEmailInput()).toHaveValue('test@example.com');
        expect(getPasswordInput()).toHaveValue('Password1!');
    });

    test('it should validate the password min length', async () => {
        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), '!Pass');
        await userEvent.click(getButton());

        expect(
            screen.queryByText(/The password is invalid/i)
        ).toBeInTheDocument();
    });

    test('it should validate the password contain at least one uppercase letter', async () => {
        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), '!password');
        await userEvent.click(getButton());

        expect(
            screen.queryByText(/The password is invalid/i)
        ).toBeInTheDocument();
    });

    test('it should validate the password contain at least one lowercase letter', async () => {
        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), '!PASSWORD');
        await userEvent.click(getButton());

        expect(
            screen.queryByText(/The password is invalid/i)
        ).toBeInTheDocument();
    });

    test('it should validate the password contain at least one special character', async () => {
        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), 'Password1');
        await userEvent.click(getButton());

        expect(
            screen.queryByText(/The password is invalid/i)
        ).toBeInTheDocument();
    });

    test('it should submit the form when password pass all validations', async () => {
        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), 'Password1!');
        await userEvent.click(getButton());

        expect(
            screen.queryByText(/The password is required/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/The password is invalid/i)
        ).not.toBeInTheDocument();
    });

    test('it should show a loading indicator while is fetching the login', async () => {
        renderWithProviders(<LoginPage />);

        expect(getButton()).not.toBeDisabled();
        expect(
            screen.queryByRole('progressbar', { name: /loading/i })
        ).not.toBeInTheDocument();

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), 'Password1!');
        await userEvent.click(getButton());

        expect(getButton()).toBeDisabled();
        expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument();
    });

    test("it should display 'Unexpected error, please try again' when the is an error from the api login", async () => {
        mockServerWithError(500);

        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), 'Password1!');
        await userEvent.click(getButton());

        expect(
            await screen.findByText(/Unexpected error, please try again/i)
        ).toBeInTheDocument();
    });

    test("it should display 'Invalid credentials' when the credentials are invalid from the api login", async () => {
        mockServerWithError(401);

        renderWithProviders(<LoginPage />);

        await userEvent.type(getEmailInput(), 'test@example.com');
        await userEvent.type(getPasswordInput(), 'Password1!');
        await userEvent.click(getButton());

        expect(
            await screen.findByText(/Invalid credentials/i)
        ).toBeInTheDocument();
    });
});
