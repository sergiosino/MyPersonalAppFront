import * as React from "react"
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, Grid, Stepper, Step, Stack, StepLabel } from '@mui/material'
import ElementCard, { ElementCardSkeleton } from "components/banks/bankAccounts/elementCard/ElementCard"
import { countryList } from "../defaultLists"
import { TextField, Typography } from "@mui/material"
import { useCountryBanks } from "hooks/banks/useCountryBanks"
import { useAddLinkedBank } from "hooks/banks/useAddLinkedBank"
import CircularProgress from '@mui/material/CircularProgress'

const newBankStepIds = {
    countrySelect: 0,
    bankSelect: 1,
    linkBankAccount: 2
}

const newBankSteps = [
    {
        id: newBankStepIds.countrySelect,
        label: "Select country"
    },
    {
        id: newBankStepIds.bankSelect,
        label: "Select bank"
    },
    {
        id: newBankStepIds.linkBankAccount,
        label: "Link bank"
    }
]

const LOADING_NUMBER_BANKS = 20

export default function AddNewBankDialog() {
    const [openNewBankDialog, setOpenNewBankDialog] = React.useState(false)
    const [newBankStep, setNewBankStep] = React.useState(newBankStepIds.countrySelect)
    const [countryListInUse, setCountryListInUse] = React.useState(countryList)
    const [bankListInUse, setBankListInUse] = React.useState([])
    const [filterKeywords, setFilterKeywords] = React.useState("")

    const { countryBanks, loading, setCountryIso } = useCountryBanks()
    const { linkNewBank, loadingAddLinkedBank } = useAddLinkedBank()

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const handleOpenNewBankDialog = () => {
        setOpenNewBankDialog(true)
    }

    const handleCloseNewBankDialog = () => {
        setOpenNewBankDialog(false)
        setNewBankStep(newBankStepIds.countrySelect)
        setFilterKeywords("")
    }

    const handleCountrySelect = (countryIsoCode) => {
        setCountryIso(countryIsoCode)
        setFilterKeywords("")
        setNewBankStep(newBankStepIds.bankSelect)
    }

    const handleBankSelect = (bankId) => {
        linkNewBank(bankId)
        // handleCloseNewBankDialog()
        setNewBankStep(newBankStepIds.linkBankAccount)
        setFilterKeywords("")
    }

    const handleFilterChange = (element) => {
        setFilterKeywords(element.target.value)
    }

    const handleStepBackClick = () => {
        setFilterKeywords("")
        setNewBankStep(prev => prev - 1)
    }

    React.useEffect(() => {
        if (newBankStep === newBankStepIds.countrySelect) {
            setCountryListInUse(countryList.filter(x => x.name.toLowerCase().includes(filterKeywords.toLowerCase())))
        }
        else if (newBankStep === newBankStepIds.bankSelect) {
            setBankListInUse(countryBanks.filter(x => x.name.toLowerCase().includes(filterKeywords.toLowerCase())))
        }
    }, [filterKeywords, countryBanks, newBankStep, setCountryListInUse, setBankListInUse])

    React.useEffect(() => {
        if (countryBanks.length > 0)
            setBankListInUse(countryBanks)
    }, [countryBanks, setBankListInUse])

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpenNewBankDialog}
            >
                Add new
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={openNewBankDialog}
                onClose={handleCloseNewBankDialog}
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle>
                    <Stack alignItems="center">
                        Add new bank
                        <Stepper sx={{ mt: 1, width: "100%" }} activeStep={newBankStep} alternativeLabel>
                            {newBankSteps.map((newBankStep) => (
                                <Step key={newBankStep.id} >
                                    <StepLabel>{newBankStep.label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {newBankStep !== newBankStepIds.linkBankAccount &&
                            <TextField
                                sx={{ mt: 1 }}
                                size="small"
                                value={filterKeywords}
                                onChange={handleFilterChange}
                                label={"Filter"}
                                fullWidth
                                variant="outlined"
                            />
                        }
                    </Stack>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {newBankStep === newBankStepIds.countrySelect &&
                        <Grid container spacing={3}>
                            {countryListInUse.map((country) =>
                                <Grid item xs={12} md={6} key={country.isoCode}>
                                    <ElementCard id={country.isoCode} name={country.name} handleElementSelect={handleCountrySelect} imageUrl={`https://flagcdn.com/h240/${country.isoCode.toLowerCase()}.png`} />
                                </Grid>
                            )}
                        </Grid>
                    }
                    {newBankStep === newBankStepIds.bankSelect &&
                        <Grid container spacing={2}>
                            {(loading ? Array.from(new Array(LOADING_NUMBER_BANKS)) : bankListInUse).map((bank, index) =>
                                bank ? (
                                    <Grid item xs={12} md={6} key={bank.id}>
                                        <ElementCard id={bank.id} name={bank.name} handleElementSelect={handleBankSelect} imageUrl={bank.logo} />
                                    </Grid>
                                ) : (
                                    <Grid item xs={12} md={6} key={index}>
                                        <ElementCardSkeleton />
                                    </Grid>
                                )
                            )}
                        </Grid>
                    }
                    {newBankStep === newBankStepIds.linkBankAccount &&
                        <Stack direction="column" alignItems="center" spacing={5} style={{ margin: "50px 0px" }}>
                            <CircularProgress />
                            <Typography variant="h5" style={{ textAlign: "center" }}>
                                Wait a minute. <br />
                                You will be redirected to continue with the process.
                            </Typography>
                        </Stack>
                    }
                </DialogContent>
                <DialogActions sx={{ display: "block" }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ padding: 2 }}>
                        <Button disabled={newBankStep === newBankStepIds.countrySelect} variant="outlined" onClick={handleStepBackClick}>
                            Back
                        </Button>
                        <Button onClick={handleCloseNewBankDialog} variant="outlined">
                            Cancel
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}