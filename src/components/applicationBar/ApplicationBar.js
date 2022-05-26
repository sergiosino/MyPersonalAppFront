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
                    sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header onDrawerToggle={handleDrawerToggle} />
                <Box component="main" sx={{ flex: 1, py: 6, px: 4 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}