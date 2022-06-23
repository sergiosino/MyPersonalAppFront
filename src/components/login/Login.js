import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useAuthToken } from 'hooks/user/useAuthToken'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import { routes } from 'constants/routes'
import { useNavigate } from "react-router-dom"

export default function Login() {
    const { signIn } = useAuthToken()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        signIn(data.get('email'), data.get('password'))
    }

    const handleNotHaveAccount = () => {
        navigate(routes.register)
    }

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
                <Grid container justifyContent="flex-end">
                    {/* <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid> */}
                    <Grid item>
                        <Link type="button" component="button" onClick={handleNotHaveAccount} variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}