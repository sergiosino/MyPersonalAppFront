import * as React from "react"
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, Grid } from '@mui/material'
import ElementCard from "components/banks/bankAccounts/elementCard/ElementCard"
import { countryList, bankListFromES } from "../defaultLists"
import { TextField } from "@mui/material"
import { Box } from "@mui/system"

const newBankSteps = {
    countrySelect: 1,
    bankSelect: 2
}

export default function AddNewBankDialog(props) {
    const { open, handleClose } = props

    const [newBankStep, setNewBankStep] = React.useState(newBankSteps.countrySelect)
    const [countryListInUse, setCountryListInUse] = React.useState(countryList)
    const [bankListInUse, setBankListInUse] = React.useState(bankListFromES)

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const handleCountrySelect = (countryIsoCode) => {
        setNewBankStep(newBankSteps.bankSelect)
        console.log(countryIsoCode)
    }

    const handleBankSelect = (bankId) => {
        console.log(bankId)
        handleClose()
    }

    const handleFilterChange = (element) => {
        if (newBankStep === newBankSteps.countrySelect) {
            setCountryListInUse(countryList.filter(x => x.name.toLowerCase().includes(element.target.value.toLowerCase())))
        }
        else if (newBankStep === newBankSteps.bankSelect) {
            setBankListInUse(bankListFromES.filter(x => x.name.toLowerCase().includes(element.target.value.toLowerCase())))
        }
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle>
                Add new bank
            </DialogTitle>
            <Divider />
            <DialogContent>
                <TextField
                    sx={{ mt: 1, pb: 3 }}
                    size="small"
                    onChange={handleFilterChange}
                    label={"Filter"}
                    fullWidth
                    variant="outlined"
                />
                {newBankStep === newBankSteps.countrySelect &&
                    <Grid container spacing={3}>
                        {countryListInUse.map((country) =>
                            <Grid item xs={12} md={6} key={country.isoCode}>
                                <ElementCard id={country.isoCode} name={country.name} handleElementSelect={handleCountrySelect} imageUrl={`https://flagcdn.com/h240/${country.isoCode.toLowerCase()}.png`} />
                            </Grid>
                        )}
                    </Grid>
                }
                {newBankStep === newBankSteps.bankSelect &&
                    <Grid container spacing={2}>
                        {bankListInUse.map((bank) =>
                            <Grid item xs={12} md={6} key={bank.id}>
                                <ElementCard id={bank.id} name={bank.name} handleElementSelect={handleBankSelect} imageUrl={bank.logo} />
                            </Grid>
                        )}
                    </Grid>
                }
                {/* </Box> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}