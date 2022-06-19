import * as React from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import RaceInfoCard, { RaceInfoCardSkeleton } from './raceInfoCard/RaceInfoCard'
import Box from '@mui/material/Box'
import { raceStatusEnum } from "constants/enums"
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'

export default function F1Schedule() {
    const [races, setRaces] = React.useState(Array.from(new Array(15)))
    const nextRaceCardRef = React.useRef(null)

    const year = new Date().getFullYear()

    const handleNextRaceClick = () => {
        nextRaceCardRef.current.scrollIntoView()
    }

    const sortRacesByDate = (response) => {
        let nextRaceFound = false
        const todayPlus3h = new Date().setHours(new Date().getHours() + 3)
        debugger
        response.data.MRData.RaceTable.Races.forEach(race => {
            if (new Date(`${race.date}T${race.time}`) > todayPlus3h) {
                if (!nextRaceFound) {
                    race.raceStatus = raceStatusEnum.next
                    nextRaceFound = true
                } else {
                    race.raceStatus = raceStatusEnum.future
                }
            } else {
                race.raceStatus = raceStatusEnum.past
            }
        });

        return response.data.MRData.RaceTable.Races
    }

    React.useEffect(() => {
        axios.get(`https://ergast.com/api/f1/${year}.json`).then(response => {
            setRaces(sortRacesByDate(response))
        }).catch(ex => {
            console.log(ex)
        })
    }, [])

    return (
        <>
            <Box sx={{ position: "relative" }}>
                <Grid container spacing={3}>
                    {races.map((race, index) =>
                        race ? (
                            <Grid
                                key={race.Circuit.circuitId}
                                item 
                                xs={12}
                                sx={{ scrollMargin: 100 }}
                                ref={race.raceStatus === raceStatusEnum.next ? nextRaceCardRef : null}
                            >
                                <RaceInfoCard race={race} year={year} />
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