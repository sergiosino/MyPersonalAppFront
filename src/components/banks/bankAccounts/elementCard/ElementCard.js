import * as React from "react"
import "./ElementCard.css"
import { CardMedia, CardContent, Card, Typography, Divider } from "@mui/material"
import { Box } from "@mui/system"
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Skeleton from "@mui/material/Skeleton"

export default function ElementCard(props) {
    const { id, name, handleElementSelect, imageUrl } = props

    const handleElementClick = () => {
        handleElementSelect(id);
    }

    return (
        <Card sx={{ display: "flex", position: "relative", flexDirection: "column" }} className="element-card" onClick={handleElementClick}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardMedia
                    component="img"
                    sx={{ maxWidth: { xs: "25%", sm: "20%" }, height: 64 }}
                    src={imageUrl}
                />
                <Divider orientation="vertical" flexItem />
                <CardContent sx={{ flex: 0.9, alignSelf: "center" }} >
                    <Typography variant="h7" className="element-card-name">
                        <b>{name}</b>
                    </Typography>
                </CardContent>
                <Box sx={{ flex: 0.1, alignSelf: "center", p: 0 }}>
                    <NavigateNextIcon />
                </Box>
            </Box>
        </Card>
    )
}

export function ElementCardSkeleton(props) {
    return (
        <Card sx={{ display: "flex" }}>
            <Skeleton variant="rectangular" width="25%" height={64} />
            <CardContent sx={{ alignSelf: "center", flex: 1 }}>
                <Skeleton variant="text" height={24} width="60%" />
            </CardContent>
        </Card>
    )
}