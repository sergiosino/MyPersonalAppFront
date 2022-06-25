import * as React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { formatDatePretty } from 'utils/formatDates'
import Skeleton from "@mui/material/Skeleton"

export default function PreRaceInfo(props) {
    const { race } = props

    const preRaceInfoCard = (title, date) => {
        return (
            <Card>
                <CardContent sx={{ paddingBottom: 16 }}>
                    <Typography align="center" variant="subtitle1">{title}</Typography>
                    <Divider variant="middle" />
                    <Typography align="center" variant="subtitle1" component="div">
                        {formatDatePretty(new Date(date))}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const firstPractice = () => {
        return preRaceInfoCard("First practice", race.firstPracticeDate)
    }

    const secondPractice = () => {
        return preRaceInfoCard("Second practice", race.secondPracticeDate)
    }

    const thirdPractice = () => {
        return preRaceInfoCard("Third practice", race.thirdPracticeDate)
    }

    const qualifying = () => {
        return preRaceInfoCard("Qualifying", race.qualifyingDate)
    }

    const sprint = () => {
        return preRaceInfoCard("Sprint", race.sprintDate)
    }

    const raceWithSprint = () => {
        return (
            <>
                <Grid item xs={12} sm={6} md={3}>
                    {qualifying()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {secondPractice()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {sprint()}
                </Grid>
            </>
        )
    }

    const raceWithoutSprint = () => {
        return (
            <>
                <Grid item xs={12} sm={6} md={3}>
                    {secondPractice()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {thirdPractice()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {qualifying()}
                </Grid>
            </>
        )
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
                {firstPractice()}
            </Grid>
            {race.sprintDate ? raceWithSprint() : raceWithoutSprint()}
        </Grid>
    )
}


export function PreRaceInfoSkeleton() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
                <Skeleton variant="rectangular" height={97} sx={{ borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Skeleton variant="rectangular" height={97} sx={{ borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Skeleton variant="rectangular" height={97} sx={{ borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Skeleton variant="rectangular" height={97} sx={{ borderRadius: 1 }} />
            </Grid>
        </Grid>
    )
}