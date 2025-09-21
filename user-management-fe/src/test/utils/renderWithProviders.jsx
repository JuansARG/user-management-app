import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export const queryClient = new QueryClient();

export const renderWithProviders = ui => {
    return render(
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
};
