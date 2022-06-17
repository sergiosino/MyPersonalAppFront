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

    const preRaceInfoCard = (title, date, time) => {
        return (
            <Card>
                <CardContent sx={{ paddingBottom: 16 }}>
                    <Typography align="center" variant="subtitle1">{title}</Typography>
                    <Divider variant="middle" />
                    <Typography align="center" variant="subtitle1" component="div">
                        {formatDatePretty(new Date(`${date}T${time}`))}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const firstPractice = () => {
        return preRaceInfoCard("First practice", race.FirstPractice?.date, race.FirstPractice?.time)
    }

    const secondPractice = () => {
        return preRaceInfoCard("Second practice", race.SecondPractice?.date, race.SecondPractice?.time)
    }

    const thirdPractice = () => {
        return preRaceInfoCard("Third practice", race.ThirdPractice?.date, race.ThirdPractice?.time)
    }

    const qualifying = () => {
        return preRaceInfoCard("Qualifying", race.Qualifying?.date, race.Qualifying?.time)
    }

    const sprint = () => {
        return preRaceInfoCard("Sprint", race.Sprint?.date, race.Sprint?.time)
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
            {race.Sprint ? raceWithSprint() : raceWithoutSprint()}
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