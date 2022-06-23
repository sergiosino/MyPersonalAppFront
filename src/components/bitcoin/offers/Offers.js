import * as React from 'react'
import OfferCard from './OfferCard'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useAllOffers } from "hooks/bitcoin/useAllOffers"

function Offers() {
    const { allOffers } = useAllOffers()

    return (
        <>
            <Typography variant="h5" gutterBottom>
                All offers with online payment
            </Typography>
            <Grid container spacing={3}>
                {allOffers?.map((offer) =>
                    <OfferCard key={offer.id} offer={offer} />
                )}
            </Grid>
        </>
    )
}

export default Offers
