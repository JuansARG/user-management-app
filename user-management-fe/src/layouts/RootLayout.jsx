import { Container, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RootLayout = ({ children }) => {
    return (
        <Container
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}
        >
            <Typography
                component="h1"
                sx={{
                    fontSize: '3rem',
                    textAlign: 'center',
                }}
            >
                React With Test Driven Development
            </Typography>
            <Divider sx={{ width: '100%', margin: '1rem 0' }} />
            {children}
        </Container>
    );
};

export default RootLayout;

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
