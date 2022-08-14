import * as React from "react"
import "./BankInfoCard.css"
import { Stack, IconButton, CardMedia, CardContent, Card, Typography, Collapse, Divider, Link } from "@mui/material"
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from "@mui/system"
import EditIcon from '@mui/icons-material/Edit'
import EditAccountFormDialog from "./EditAccountFormDialog"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton size="large" {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function BankInfoCard(props) {
    const { name, handleDelteBank, logoUrl, bankAccounts } = props

    const [expanded, setExpanded] = React.useState(false)
    const [openEditAccountDialog, setOpenEditAccountDialog] = React.useState(false)
    const [formEditAccount, setFormEditAccount] = React.useState(null)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleOpenEditAccount = (id) => {
        setFormEditAccount(bankAccounts.find(x => x.id === id))
        setOpenEditAccountDialog(true)
    }

    const handleCloseEditAccount = () => {
        setOpenEditAccountDialog(false)
        setFormEditAccount(null)
    }

    return (
        <>
            <Card sx={{ display: "flex", position: "relative", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: "20%", maxWidth: 139, height: 139 }}
                        src={logoUrl}
                    />
                    <CardContent sx={{ flex: 0.9, alignSelf: "center" }}>
                        <Typography variant="h5" className="bank-card-name">
                            <b>{name}</b>
                        </Typography>
                        <Typography variant="subtitle1" className="bank-card-accounts">
                            <b>Account/s: </b>{bankAccounts.length > 0 ? bankAccounts?.map(x => x.name)?.join(", ") : "None"}
                        </Typography>
                    </CardContent>
                    <Box sx={{ flex: 0.1, alignSelf: "center", p: 0 }}>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon fontSize="inherit" />
                        </ExpandMore>
                    </Box>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {bankAccounts.map((bankAccount) =>
                            <div key={bankAccount.id}>
                                <Divider>
                                    <Typography variant="h7">
                                        <b>{bankAccount.name ?? bankAccount.iban}</b>
                                    </Typography>
                                </Divider>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle1">
                                        {bankAccount.iban}
                                    </Typography>
                                    <Typography variant="subtitle1" noWrap>
                                        {bankAccount.balanceAmount} {bankAccount.balanceCurrency}
                                    </Typography>
                                    <IconButton onClick={() => handleOpenEditAccount(bankAccount.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </Stack>
                            </div>
                        )}
                        <Divider />
                        <Box sx={{ textAlign: "right", mt: 2, mb: -2 }}>
                            <Typography variant="caption">
                                Do yo want to delete the linked bank and all the accounts and info? <Link component="button" variant="caption" onClick={() => alert(":(")}>Click here</Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Collapse>
            </Card>
            {openEditAccountDialog &&
                <EditAccountFormDialog open={openEditAccountDialog} accountInfo={formEditAccount} handleClose={handleCloseEditAccount} />
            }
        </>
    )
}