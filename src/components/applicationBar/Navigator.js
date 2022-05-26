import * as React from 'react'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SettingsIcon from '@mui/icons-material/Settings'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { useNavigate } from "react-router-dom"
import { routes } from '../../utils/routes'
import LoginIcon from '@mui/icons-material/Login'
import AuthTokenContext from '../../contexts/AuthTokenContext'

export default function Navigator(props) {
    const { ...other } = props

    const navigate = useNavigate()
    const { token } = React.useContext(AuthTokenContext)

    return (
        <Drawer variant="permanent" {...other}>
            <List>
                <ListItem sx={{ py: 1.4, px: 3, fontSize: 22 }}>
                    My personal app
                </ListItem>
                <Divider />
                {/* FORMULA 1 */}
                <Box>
                    <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText>Formula 1</ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ px: 3 }} onClick={() => navigate(routes.f1Schedule)}>
                            <ListItemIcon>
                                <LocalOfferIcon />
                            </ListItemIcon>
                            <ListItemText primary="Schedule" />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mt: 2 }} />
                </Box>
                {/* HODLHODL - BITCOIN */}
                {token && (
                    <Box>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText>HodlHodl</ListItemText>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ px: 3 }} onClick={() => navigate(routes.offers)}>
                                <ListItemIcon>
                                    <LocalOfferIcon />
                                </ListItemIcon>
                                <ListItemText primary="Offers" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ px: 3 }} onClick={() => navigate(routes.tasksConfig)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Trasks config" />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                )}
            </List>
        </Drawer>
    )
}