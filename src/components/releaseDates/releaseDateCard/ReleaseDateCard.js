import * as React from "react"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IconButton from "@mui/material/IconButton"
import FavoriteIcon from "@mui/icons-material/Favorite"

export default function ReleaseDateCard(props) {
    const { id, name, coverUrl, releaseDate, platformNames, favourite = false } = props

    const [fav, setFav] = React.useState(favourite)

    const handleCardClick = () => {
        alert(id)
    }

    const handleFavClick = () => {
        setFav(!fav)
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", position: "relative", cursor: "pointer" }}>
                <CardMedia
                    component="img"
                    sx={{ width: "20%", maxWidth: 150 }}
                    src={coverUrl}
                    onClick={handleCardClick}
                />
                <CardContent sx={{ flex: 1 }} onClick={handleCardClick}>
                    <Typography variant="subtitle2">
                        <b>{name}</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Platform: {platformNames}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date: {releaseDate}
                    </Typography>
                </CardContent>
                <IconButton sx={{ position: "absolute", bottom: 0, right: 0 }} aria-label="Fav" onClick={handleFavClick}>
                    {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </Card>
        </Grid >
    )
}