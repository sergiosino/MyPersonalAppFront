import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { post } from '../../actions/Actions';
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from '../../utils/jwtToken';
import { routes } from '../../utils/routes';
import { toast } from 'react-toastify';

export default function SignIn() {
    let location = useLocation();
    let navigate = useNavigate();

    let from = location.state?.from?.pathname || routes.offers;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        var userData = {
            "email": data.get('email'),
            "password": data.get('password'),
            "returnSecureToken": true
        }

        post().login(userData).then((response) => {
            setToken(response.data.idToken);
            navigate(from, { replace: true });
        }).catch((error) => {
            toast.error("Error trying to log in");
            console.log(error);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, marginTop: 8 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </Container>
    );
}