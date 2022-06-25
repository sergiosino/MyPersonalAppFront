import * as React from "react"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IconButton from "@mui/material/IconButton"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Skeleton from "@mui/material/Skeleton"

export default function GameCard(props) {
    const { id, name, coverUrl, releaseDate, platformNames, favourite, handleAddFav, handleDelteFav } = props

    const [fav, setFav] = React.useState(favourite)

    const handleCardClick = () => {
        alert(id)
    }

    const handleFavClick = () => {
        if (!fav)
            handleAddFav(id)
        else
            handleDelteFav(id)
        setFav(!fav)
    }

    return (
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
                    Platform: {platformNames ?? "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    First release: {releaseDate ?? "Unknown"}
                </Typography>
            </CardContent>
            <IconButton sx={{ position: "absolute", bottom: 0, right: 0 }} aria-label="Fav" onClick={handleFavClick}>
                {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
        </Card>
    )
}

export function ReleaseDateCardSkeleton() {
    return (
        <Card sx={{ display: "flex" }}>
            <Skeleton variant="rectangular" width="20%" height={102} />
            <CardContent sx={{ flex: 1 }}>
                <Skeleton variant="text" height={22} />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
            </CardContent>
        </Card>
    )
}