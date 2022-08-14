import * as React from "react"
import "./ElementCard.css"
import { CardMedia, CardContent, Card, Typography } from "@mui/material"
import { Box } from "@mui/system"
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

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
                    sx={{ maxWidth: "25%", height: 64 }}
                    src={imageUrl}
                />
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