import * as React from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import RaceInfoCard, { RaceInfoCardSkeleton } from './raceInfoCard/RaceInfoCard'
import Box from '@mui/material/Box'
import { raceStatusEnum } from "constants/enums"
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'

function F1Schedule() {
    const [races, setRaces] = React.useState(Array.from(new Array(15)))

    let nextRaceFound = null
    const actualYear = new Date().getFullYear()

    const getRaceStatus = (race) => {
        const todayPlus3h = new Date().setHours(new Date().getHours() + 3)
        if (new Date(race.date) > todayPlus3h) {
            if (!nextRaceFound) {
                nextRaceFound = document.getElementById(`${race.Circuit.circuitId}-raceInfoCard`)
                return raceStatusEnum.next
            }
            return raceStatusEnum.future
        }
        return raceStatusEnum.past
    }

    const handleNextRaceClick = () => {
        nextRaceFound.scrollIntoView()
    }

    React.useEffect(() => {
        axios.get(`https://ergast.com/api/f1/${actualYear}.json`).then(response => {
            setRaces(response.data.MRData.RaceTable.Races)
        }).catch(ex => {
            console.log(ex)
        })
    }, [])

    return (
        <>
            <Box sx={{ position: "relative" }}>
                <Grid container spacing={3}>
                    {console.log("races", races)}
                    {races.map((race, index) =>
                        race ? (
                            <Grid id={`${race.Circuit.circuitId}-raceInfoCard`} key={race.Circuit.circuitId} item xs={12}>
                                <RaceInfoCard race={race} raceStatus={getRaceStatus(race)} year={actualYear} />
                            </Grid>
                        ) : (
                            <Grid key={index} item xs={12}>
                                <RaceInfoCardSkeleton key={12341234} />
                            </Grid>
                        )
                    )}
                </Grid>
                <Zoom
                    in={true}
                    sx={{ position: 'fixed', bottom: "5%", right: "5%" }}
                    style={{ transitionDelay: "750ms" }}
                    unmountOnExit
                >
                    <Fab variant="extended" aria-label="Next race" color="primary" onClick={handleNextRaceClick}>
                        <SportsMotorsportsIcon sx={{ mr: 1 }} />
                        Next Race
                    </Fab>
                </Zoom>
            </Box>
        </>
    )
}

export default F1Schedule
