import { CssBaseline } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <RootLayout>
                <LoginPage />
            </RootLayout>
        </QueryClientProvider>
    );
};

export default App;
