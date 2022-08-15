import React from "react"
import BankInfoCard, { BankInfoCardSkeleton } from "./BankInfoCard"
import { Grid, Typography } from "@mui/material"
import { Masonry } from "@mui/lab"
import AddNewBankDialog from "./AddNewBankDialog"
import { useLinkedBanks } from "hooks/banks/useLinkedBanks"

const LOADING_NUMBER_LINKED_BANKS = 5

export default function BankAccounts() {
    const { linkedBanks, loading, deleteLinkedBank, editAccount } = useLinkedBanks()

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
                        <AddNewBankDialog />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Masonry columns={{ xs: 1, sm: 1, md: 1, lg: 2 }} spacing={2} sx={{ m: 0 }}>
                        {(loading ? Array.from(new Array(LOADING_NUMBER_LINKED_BANKS)) : linkedBanks).map((linkedBank, index) =>
                            linkedBank ? (
                                <BankInfoCard
                                    key={linkedBank.id}
                                    bankInfo={linkedBank}
                                    handleDelteBank={deleteLinkedBank}
                                    editAccount={editAccount}
                                />
                            ) : (
                                <BankInfoCardSkeleton key={index} />
                            )
                        )}
                    </Masonry>
                </Grid>
            </Grid>
        </>
    )
}