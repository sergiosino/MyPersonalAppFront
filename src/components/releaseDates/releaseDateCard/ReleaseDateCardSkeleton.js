import * as React from "react"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Skeleton from "@mui/material/Skeleton"

export default function ReleaseDateCardSkeleton() {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex" }}>
                <Skeleton variant="rectangular" width="20%" height={102} />
                <CardContent sx={{ flex: 1 }}>
                    <Skeleton variant="text" height={22} />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
            </Card>
        </Grid >
    )
}