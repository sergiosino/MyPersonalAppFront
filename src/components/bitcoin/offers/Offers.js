import * as React from 'react'
import OfferCard from './OfferCard'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { get } from '../../../actions/actionss'
import { toast } from 'react-toastify'

function Offers() {

    const [offers, setOffers] = React.useState([])

    const getAllOffers = () => {
        get().allOffers().then(response => {
            setOffers(response.data)
        }).catch(ex => {
            toast.error("Error getting the actual offers")
            console.log(ex)
        })
    }

    React.useEffect(() => {
        getAllOffers()
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
