import * as React from "react"
import "./BankInfoCard.css"
import { Stack, IconButton, CardMedia, CardContent, Card, Typography, Collapse, Divider, Link, Skeleton } from "@mui/material"
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from "@mui/system"
import EditIcon from '@mui/icons-material/Edit'
import EditAccountFormDialog from "./EditAccountFormDialog"
import AlertDialog from "components/common/AlertDialog"

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
    const { bankInfo, handleDelteBank } = props

    const [expanded, setExpanded] = React.useState(false)
    const [openEditAccountDialog, setOpenEditAccountDialog] = React.useState(false)
    const [openAlertDialogDeleteLinkedBank, setOpenAlertDialogDeleteLinkedBank] = React.useState(false)
    const [formEditAccount, setFormEditAccount] = React.useState(null)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleOpenEditAccount = (id) => {
        setFormEditAccount(bankInfo.accounts.find(x => x.id === id))
        setOpenEditAccountDialog(true)
    }

    const handleCloseEditAccount = () => {
        setOpenEditAccountDialog(false)
        setFormEditAccount(null)
    }

    const handleDeleteLinkedBankClick = () => {
        setOpenAlertDialogDeleteLinkedBank(true)
    }

    const handleAgreeDeleteLinkedBank = () => {
        handleDelteBank(bankInfo.id)
        setOpenAlertDialogDeleteLinkedBank(false)
    }

    return (
        <>
            <Card sx={{ display: "flex", position: "relative", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: "20%", maxWidth: 139, height: 120 }}
                        src={bankInfo.bank.logo}
                    />
                    <CardContent sx={{ flex: 0.9, alignSelf: "center" }}>
                        <Typography variant="h5" className="bank-card-name">
                            <b>{bankInfo.bank.name}</b>
                        </Typography>
                        <Typography variant="subtitle1" className="bank-card-accounts">
                            <b>Accounts: </b>{bankInfo.accounts.length > 0 ? bankInfo.accounts.length : "None"}
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
                        {bankInfo.accounts.map((bankAccount, index) =>
                            <div key={bankAccount.id}>
                                <Divider style={{ marginTop: 5 }}>
                                    <Typography variant="h7">
                                        <b>{bankAccount.name ?? `Account ${index + 1}`}</b>
                                    </Typography>
                                </Divider>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle1">
                                        {bankAccount.iban}
                                    </Typography>
                                    <Typography variant="subtitle1" noWrap>
                                        {bankAccount.balanceAmount} {bankAccount.balanceCurrency}
                                    </Typography>
                                    <IconButton style={{ border: "1px solid", padding: "5px", borderColor: "lightgray" }} onClick={() => handleOpenEditAccount(bankAccount.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </Stack>
                            </div>
                        )}
                        <Box sx={{ textAlign: "right", mt: 2, mb: -2 }}>
                            <Typography variant="caption">
                                Do yo want to delete the linked bank and all the accounts and info? <Link component="button" variant="caption" onClick={handleDeleteLinkedBankClick}>Click here</Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Collapse>
            </Card>
            {openEditAccountDialog &&
                <EditAccountFormDialog open={openEditAccountDialog} accountInfo={formEditAccount} handleClose={handleCloseEditAccount} />
            }
            {openAlertDialogDeleteLinkedBank &&
                <AlertDialog
                    open={openAlertDialogDeleteLinkedBank}
                    setOpen={setOpenAlertDialogDeleteLinkedBank}
                    handleAgree={handleAgreeDeleteLinkedBank}
                    title="Delete linked bank account?"
                    contentText="Deleting the linked bank will remove all settings related to it, including associated accounts.It will not be possible to retrieve it."
                />
            }
        </>
    )
}

export function BankInfoCardSkeleton() {
    return (
        <Card sx={{ display: "flex" }}>
            <Skeleton variant="rectangular" width="20%" height={120} />
            <CardContent sx={{ alignSelf: "center", flex: 1 }}>
                <Skeleton variant="text" height={32} width="60%" />
                <Skeleton variant="text" height={17} width="80%" />
                <Skeleton variant="text" height={17} width="50%" />
            </CardContent>
        </Card>
    )
}