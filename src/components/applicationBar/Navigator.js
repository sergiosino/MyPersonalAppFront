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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useNavigate } from "react-router-dom"
import { routes } from 'utils/routes'
import AuthContext from 'contexts/AuthContext'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { ADMIN_EMAIL } from 'constants/constants'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'

export default function Navigator(props) {
    const { onClose, ...other } = props

    const navigate = useNavigate()
    const { userInfo } = React.useContext(AuthContext)

    const handleSelectItem = (route) => () => {
        onClose()
        navigate(route)
    }

    return (
        <Drawer variant="permanent" onClose={onClose} {...other}>
            <List sx={{ py: 0 }}>
                <ListItem sx={{ py: 0.9, px: 3, fontSize: 22 }}>
                    My personal app
                </ListItem>
                <Divider />
                {/* FORMULA 1 */}
                <Box>
                    <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText>Formula 1</ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ px: 3 }} onClick={handleSelectItem(routes.f1Schedule)}>
                            <ListItemIcon>
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText primary="Schedule" />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mt: 2 }} />
                </Box>
                {/* VIDEO GAMES */}
                <Box>
                    <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText>Video games</ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ px: 3 }} onClick={handleSelectItem(routes.releasesDates)}>
                            <ListItemIcon>
                                <SportsEsportsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Coming games" />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mt: 2 }} />
                </Box>
                {/* SIGNED USERS */}
                {userInfo && (
                    <>
                        {/* HODLHODL - BITCOIN */}
                        <Box>
                            <ListItem sx={{ py: 2, px: 3 }}>
                                <ListItemText>HodlHodl</ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ px: 3 }} onClick={handleSelectItem(routes.offers)}>
                                    <ListItemIcon>
                                        <LocalOfferIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Offers" />
                                </ListItemButton>
                            </ListItem>
                            {userInfo.email === ADMIN_EMAIL && (
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ px: 3 }} onClick={handleSelectItem(routes.tasksConfig)}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Trasks config" />
                                    </ListItemButton>
                                </ListItem>
                            )}
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                        {/* BANK ACCOUNTS */}
                        <Box>
                            <ListItem sx={{ py: 2, px: 3 }}>
                                <ListItemText>Bank accounts</ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ px: 3 }} onClick={handleSelectItem(routes.banks)}>
                                    <ListItemIcon>
                                        <AccountBalanceIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Banks" />
                                </ListItemButton>
                            </ListItem>
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    </>
                )}
            </List>
        </Drawer>
    )
}