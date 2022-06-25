import * as React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LinkNewTab from 'components/common/LinkNewTab'
import { raceStatusEnum } from "constants/enums"
import { formatDatePretty } from 'utils/formatDates'
import Skeleton from "@mui/material/Skeleton"

export default function HeaderRaceInfo(props) {
    const { race } = props

    const getRaceIcon = () => {
        if (race.status === raceStatusEnum.past)
            return <CheckCircleIcon sx={{ color: "darkgreen" }} fontSize="small" />
        else if (race.status === raceStatusEnum.next)
            return <SportsScoreIcon />
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} lg={8}>
                <Grid item container xs={12} spacing={1} alignItems="center">
                    <Grid item>
                        <LinkNewTab href={race.url} variant="h5">
                            {race.name}
                        </LinkNewTab>
                    </Grid>
                    <Grid item display={"flex"}>
                        {getRaceIcon()}
                    </Grid>
                </Grid>
                <Typography variant="subtitle1" component="div">
                    Race date: {formatDatePretty(new Date(race.raceDate))}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="body2">
                    Country: {race.circuit?.country}
                </Typography>
                <Typography variant="body2">
                    Locality: {race.circuit?.locality}
                </Typography>
                <Typography variant="body2">
                    Circuit name: <LinkNewTab href={race.circuit?.url}>{race.circuit?.name}</LinkNewTab>
                </Typography>
            </Grid>
        </Grid>
    )
}

export function HeaderRaceInfoSkeleton() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} lg={8}>
                <Grid item container xs={12} spacing={1} alignItems="center">
                    <Grid item xs>
                        <Skeleton variant="text" height={27} width="50%" />
                    </Grid>
                </Grid>
                <Skeleton variant="text" height={17} width="30%" />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Skeleton variant="text" height={16} width="40%" />
                <Skeleton variant="text" height={16} width="30%" />
                <Skeleton variant="text" height={16} width="70%" />
            </Grid>
        </Grid>
    )
}