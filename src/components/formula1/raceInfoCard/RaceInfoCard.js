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
import PreRaceInfo from './PreRaceInfo'
import HeaderRaceInfo from './HeaderRaceInfo'
import ResultsTable from "../ResultsTable"
import { qualyTableCols, raceTableCols } from "../tablesCols"

export default function RaceInfoCard(props) {
    const { race, raceStatus, year } = props

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
                    <HeaderRaceInfo race={race} raceStatus={raceStatus} />
                    {/* Practice and qualifying dates */}
                    <PreRaceInfo race={race} />
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