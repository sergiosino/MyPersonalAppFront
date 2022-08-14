import React from "react"
import BankInfoCard from "./BankInfoCard"
import { Button, Grid, Typography } from "@mui/material"
import { Masonry } from "@mui/lab"
import AddNewBankDialog from "./AddNewBankDialog"

const bankAccounts = [
    {
        "id": "16c64aa0-c2b6-44af-ae99-da02740c80a8",
        "iban": "ES8821009801690200040743",
        "name": "Común",
        "balanceAmount": 9999.99,
        "balanceCurrency": "EUR"
    },
    {
        "id": "1ea9b27d-8998-4a36-bb15-13e419e6f6eb",
        "iban": "ES5421009801640200040630",
        "name": "Personal actualizada",
        "balanceAmount": 100009.99,
        "balanceCurrency": "EUR"
    }
]

export default function BankAccounts(props) {

    const [openNewBankDialog, setOpenNewBankDialog] = React.useState(false)

    const handleOpenNewBankDialog = () => {
        setOpenNewBankDialog(true)
    }

    const handleCloseNewBankDialog = () => {
        setOpenNewBankDialog(false)
    }

    return (
        <>
            <Grid container>
                <Grid item container spacing={1} xs={12} sx={{ m: 1 }}>
                    <Grid item xs sx={{ ml: -1 }}>
                        <Typography variant="h5">
                            My bank accounts
                        </Typography>
                    </Grid>
                    <Grid item sx={{ textAlign: "right" }}>
                        <Button
                            variant="contained"
                            onClick={handleOpenNewBankDialog}
                        >
                            Add new
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Masonry columns={{ xs: 1, sm: 1, md: 1, lg: 2 }} spacing={2} sx={{ m: 0 }}>
                        <BankInfoCard
                            key={0}
                            name="CaixaBank"
                            logoUrl={"https://cdn.nordigen.com/ais/CAIXABANK_CAIXESBB.png"}
                            bankAccounts={bankAccounts}
                        />
                        <BankInfoCard key={1} name="Abanca" logoUrl={"https://cdn.nordigen.com/ais/ABANCA_CAGLESMM.png"} bankAccounts={[]} />
                        <BankInfoCard key={2} name="Activo Bank" logoUrl={"https://cdn.nordigen.com/ais/BANCSABADELL_BSABESBB.png"} bankAccounts={[]} />
                        <BankInfoCard key={3} name="Airwallex" logoUrl={"https://cdn.nordigen.com/ais/AIRWALLEX_AIPTAU32_1.png"} bankAccounts={[]} />
                        <BankInfoCard key={4} name="Andbank" logoUrl={"https://cdn.nordigen.com/ais/ANDBANK_BACAESMM.png"} bankAccounts={[]} />
                        <BankInfoCard key={5} name="Arquia Banca" logoUrl={"https://cdn.nordigen.com/ais/ARQUIA_CASDESBB.png"} bankAccounts={[]} />
                        <BankInfoCard key={6} name="Banca March" logoUrl={"https://cdn.nordigen.com/ais/MARCH_BMARES2M.png"} bankAccounts={[]} />
                    </Masonry>
                </Grid>
            </Grid>
            {openNewBankDialog &&
                <AddNewBankDialog open={openNewBankDialog} handleClose={handleCloseNewBankDialog} />
            }
        </>
    )
}