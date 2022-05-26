import * as React from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import RaceInfoCard from '../raceInfoCard/RaceInfoCard'
import { raceStatusEnum } from "../../../constants/enums"

function F1Schedule() {

    const [races, setRaces] = React.useState([])
    let nextRaceFound = false
    const year = new Date().getFullYear()

    const getRacesInfo = () => {
        axios.get(`https://ergast.com/api/f1/${year}.json`).then(response => {
            setRaces(response.data.MRData.RaceTable.Races)
        }).catch(ex => {
            console.log(ex)
        })
    }

    const getNextRace = () => {
        const todayPlus3h = new Date().setHours(new Date().getHours() + 3)
        for (let race in races) {
            if (new Date(races[race].date) > todayPlus3h) {
                document.getElementById(`${races[race].Circuit.circuitId}-raceInfoCard`).scrollIntoView()
                break
            }
        }
    }

    const getRaceStatus = (race) => {
        if (new Date(race.date) > new Date().setHours(new Date().getHours() + 3)) {
            if (!nextRaceFound) {
                nextRaceFound = true
                return raceStatusEnum.next
            }
            return raceStatusEnum.future
        }
        return raceStatusEnum.past
    }

    React.useEffect(() => {
        getRacesInfo()
    }, [])

    React.useEffect(() => {
        if (races.length > 0)
            getNextRace()
    }, [races])

    return (
        <>
            <Grid container spacing={3}>
                {races.map((race) =>
                    <Grid id={`${race.Circuit.circuitId}-raceInfoCard`} key={race.Circuit.circuitId} item xs={12} sx={{ scrollMargin: 100 }}>
                        <RaceInfoCard race={race} raceStatus={getRaceStatus(race)} year={year} />
                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default F1Schedule
