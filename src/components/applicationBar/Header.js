import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import LogoutIcon from '@mui/icons-material/Logout'
import ToggleColorModeContext from 'contexts/ToggleColorModeContext'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useAuthToken } from 'hooks/useAuthToken'
import AuthContext from 'contexts/AuthContext'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom"
import { routes } from 'utils/routes'

function Header(props) {
    const { onDrawerToggle } = props

    const colorMode = React.useContext(ToggleColorModeContext)
    const theme = useTheme()
    const navigate = useNavigate()
    const { logout } = useAuthToken()
    const { userInfo } = React.useContext(AuthContext)

    const handleSignOut = () => {
        logout()
    }

    return (
        <AppBar>
            <Toolbar variant="dense">
                <Grid container spacing={2} alignItems="center">
                    <Grid sx={{ display: { md: 'none', sm: 'block' } }} item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onDrawerToggle}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                        <IconButton
                            color="inherit"
                            onClick={colorMode.toggleColorMode}
                            edge="end"
                            sx={{ ml: 2 }}>
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Grid>
                    <Grid item>
                        {userInfo ?
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                onClick={handleSignOut}
                                color="inherit">
                                <LogoutIcon />
                            </IconButton>
                            :
                            <Button
                                color="inherit"
                                onClick={() => navigate(routes.login)}>
                                Sign in
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header