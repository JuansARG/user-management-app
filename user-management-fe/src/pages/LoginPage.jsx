import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schemas/loginSchema';
import {
    Typography,
    Container,
    TextField,
    Button,
    Backdrop,
    Box,
    Alert,
} from '@mui/material';
import { useLoginMutation } from '../hooks/useLoginMutation';

import StyledLoader from '../components/StyledLoader';

const LoginPage = () => {
    const [errorOptions, setErrorOptions] = useState();
    const mutation = useLoginMutation();

    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async ({ email, password }) => {
        mutation.mutate(
            { email, password },
            {
                onError: error => {
                    const errorConfig = {
                        status: error?.response?.status,
                        message: null,
                        severity: null,
                    };

                    if (errorConfig.status === 401) {
                        errorConfig.message = 'Invalid credentials';
                        errorConfig.severity = 'warning';
                    } else {
                        errorConfig.message =
                            'Unexpected error, please try again';
                        errorConfig.severity = 'error';
                    }

                    setErrorOptions(errorConfig);
                },
            }
        );
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h2" sx={{ fontSize: '2rem', mb: 2 }}>
                Login
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '70%',
                    gap: '1rem',
                }}
            >
                {mutation.isError ? (
                    <Alert severity={errorOptions?.severity}>
                        {errorOptions?.message}
                    </Alert>
                ) : null}

                <TextField
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    label="Email"
                    type="email"
                    {...register('email', { required: true })}
                />
                <TextField
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    label="Password"
                    type="password"
                    {...register('password', { required: true })}
                />

                <Button
                    disabled={mutation.isPending}
                    type="submit"
                    variant="contained"
                >
                    Submit
                </Button>
            </Box>

            {mutation.isPending && (
                <Backdrop open>
                    <StyledLoader aria-label="loading" role="progressbar" />
                </Backdrop>
            )}
        </Container>
    );
};

export default LoginPage;
