// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { vi, afterEach, beforeAll, afterAll } from 'vitest';

import { server } from './mocks/server';
import { queryClient } from './utils/renderWithProviders';

// Mock the env module to provide a mock BACKEND_URL
vi.mock('../env', () => ({
    default: {
        BACKEND_URL: 'http://mock-server.com',
    },
}));

// Clear all data from the query cache after each test
afterEach(() => queryClient.clear());
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
