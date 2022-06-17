import * as React from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import PreRaceInfo, { PreRaceInfoSkeleton } from './PreRaceInfo'
import HeaderRaceInfo, { HeaderRaceInfoSkeleton } from './HeaderRaceInfo'
import ResultsTable from "../ResultsTable"
import { qualyTableCols, raceTableCols } from "../tablesCols"
import Skeleton from "@mui/material/Skeleton"

export default function RaceInfoCard(props) {
    const { race, year } = props

    const [expanded, setExpanded] = React.useState(false)
    const [qualyResults, setQualyResults] = React.useState(null)
    const [raceResults, setRaceResults] = React.useState(null)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
        if (!isExpanded) {
            setQualyResults(null)
            setRaceResults(null)
        } else if (panel === "qualy") {
            getQualifyingResult()
            setRaceResults(null)
        } else {
            getRaceResult()
            setQualyResults(null)
        }
    }

    const getQualifyingResult = () => {
        axios.get(`https://ergast.com/api/f1/${year}/${race.round}/qualifying.json`).then(response => {
            setQualyResults(response.data?.MRData?.RaceTable?.Races[0].QualifyingResults)
        }).catch(ex => {
            console.log(ex)
        })
    }

    const getRaceResult = () => {
        axios.get(`https://ergast.com/api/f1/${year}/${race.round}/results.json`).then(response => {
            setRaceResults(response.data?.MRData?.RaceTable?.Races[0].Results)
        }).catch(ex => {
            console.log(ex)
        })
    }

    return (
        <Card elevation={8}>
            <CardContent>
                <Grid container spacing={1}>
                    {/* Header with race name, date and other info */}
                    <Grid item xs={12}>
                        <HeaderRaceInfo race={race} />
                    </Grid>
                    {/* Practice and qualifying dates */}
                    <Grid item xs={12}>
                        <PreRaceInfo race={race} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent sx={{ paddingTop: 0 }}>
                <Accordion expanded={expanded === 'qualy'} onChange={handleChange('qualy')} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">
                            Qualifying results
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {qualyResults ? <ResultsTable rows={qualyResults} columns={qualyTableCols} /> : "No results yet"}
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'race'} onChange={handleChange('race')} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">
                            Race results
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {raceResults ? <ResultsTable rows={raceResults} columns={raceTableCols} isRaceResults /> : "No results yet"}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export function RaceInfoCardSkeleton() {
    return (
        <Card elevation={8}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <HeaderRaceInfoSkeleton />
                    </Grid>
                    <Grid item xs={12}>
                        <PreRaceInfoSkeleton />
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent sx={{ paddingTop: 0 }}>
                <Skeleton variant="rectangular" height={104} sx={{ borderRadius: 1 }} />
            </CardContent>
        </Card>
    )
}