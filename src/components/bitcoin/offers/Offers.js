import * as React from 'react'
import OfferCard from './OfferCard'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import { useOffersActions } from "hooks/actions/useOffersActions"

function Offers() {

    const [offers, setOffers] = React.useState([])
    const { getAllOffers } = useOffersActions()

    React.useEffect(() => {
        getAllOffers().then(response => {
            setOffers(response.data)
        }).catch(ex => {
            toast.error("Error getting the actual offers")
        })
    }, [])

    return (
        <>
            <Typography variant="h5" gutterBottom>
                All offers with online payment
            </Typography>
            <Grid container spacing={3}>
                {offers.map((offer) =>
                    <OfferCard key={offer.id} offer={offer} />
                )}
            </Grid>
        </>
    )
}

export default Offers
