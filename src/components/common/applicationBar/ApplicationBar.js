import * as React from 'react'
import Box from '@mui/material/Box'
import Navigator from './Navigator'
import Header from './Header'

const drawerWidth = 256

export default function ApplicationBar(props) {
    const { children } = props

    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Navigator
                    PaperProps={{ style: { width: drawerWidth } }}
                    sx={{ display: { md: 'none', sm: 'block' } }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle} />
                <Navigator
                    PaperProps={{ style: { width: drawerWidth } }}
                    sx={{ display: { md: 'block', xs: 'none' } }} />
            </Box>
            <Header onDrawerToggle={handleDrawerToggle} />
            {children}
        </Box>
    )
}