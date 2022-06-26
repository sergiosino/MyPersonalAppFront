import * as React from 'react'
import Grid from '@mui/material/Grid'
import RaceInfoCard, { RaceInfoCardSkeleton } from './raceInfoCard/RaceInfoCard'
import Box from '@mui/material/Box'
import { raceStatusEnum } from "constants/enums"
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'
import { useRaces } from 'hooks/formula1/useRaces'

const LOADING_NUMBER_RACES = 10

export default function F1Schedule() {
    const { races, loading } = useRaces({ year: new Date().getFullYear() })
    const nextRaceCardRef = React.useRef(null)

    const handleNextRaceClick = () => {
        nextRaceCardRef.current.scrollIntoView()
    }

    return (
        <>
            <Box sx={{ position: "relative" }}>
                <Grid container spacing={3}>
                    {(loading ? Array.from(new Array(LOADING_NUMBER_RACES)) : races).map((race, index) =>
                        race ? (
                            <Grid
                                key={race.circuit.id}
                                item
                                xs={12}
                                sx={{ scrollMargin: 100 }}
                                ref={race.status === raceStatusEnum.next ? nextRaceCardRef : null}
                            >
                                <RaceInfoCard race={race} />
                            </Grid>
                        ) : (
                            <Grid key={index} item xs={12}>
                                <RaceInfoCardSkeleton key={12341234} />
                            </Grid>
                        )
                    )}
                </Grid>
                {!loading &&
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
                }
            </Box>
        </>
    )
}