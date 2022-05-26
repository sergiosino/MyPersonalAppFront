import * as React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LinkNewTab from '../LinkNewTab'
import { raceStatusEnum } from "../../../constants/enums"
import { formatDatePretty } from '../../../utils/formatDates'

export default function HeaderRaceInfo(props) {
    const { race, raceStatus } = props

    const getRaceIcon = () => {
        if (raceStatus === raceStatusEnum.past)
            return <CheckCircleIcon sx={{ color: "darkgreen" }} fontSize="small" />
        else if (raceStatus === raceStatusEnum.next)
            return <SportsScoreIcon />
    }

    return (
        <Grid item container xs={12} spacing={1}>
            <Grid item xs={12} sm={6} lg={8}>
                <Grid item container xs={12} spacing={1} alignItems="center">
                    <Grid item>
                        <LinkNewTab href={race.url} variant="h5">
                            {race.raceName}
                        </LinkNewTab>
                    </Grid>
                    <Grid item display={"flex"}>
                        {getRaceIcon()}
                    </Grid>
                </Grid>
                <Typography variant="subtitle1" component="div">
                    Race date: {formatDatePretty(new Date(`${race.date}T${race.time}`))}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="body2">
                    Country: {race.Circuit?.Location?.country}
                </Typography>
                <Typography variant="body2">
                    Locality: {race.Circuit?.Location?.locality}
                </Typography>
                <Typography variant="body2">
                    Circuit name: <LinkNewTab href={race.Circuit?.url}>{race.Circuit.circuitName}</LinkNewTab>
                </Typography>
            </Grid>
        </Grid>
    )
}