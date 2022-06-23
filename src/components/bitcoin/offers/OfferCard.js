import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function OfferCard(props) {
    const { offer } = props
    console.log("offer", offer)
    return (
        <Grid item xs={12}>
                <Card sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: "15%", maxWidth: 150 }}
                        src={offer.trader.avatar_url}
                        alt={offer.trader.login}
                    />
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {offer.priceString}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            User: {offer.trader.login}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Trades: {offer.trader.trades_count}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Rating: {offer.trader.ratingFormatted}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Status: {offer.trader.online_status}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {offer.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {offer.payment_method_instructions.map((payment) =>
                                payment.payment_method_name
                            ).join(", ")}
                        </Typography>
                    </CardContent>
                </Card>
        </Grid>
    )
}

export default OfferCard
