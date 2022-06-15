import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { toast } from 'react-toastify'
import { useVideoGamesActions } from "hooks/actions/useVideoGamesActions"

function VideoGameCard(props) {
    const { name, cover, releaseDate, platformName, storyline } = props

    return (
        <Grid item xs={12}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: "15%", maxWidth: 150 }}
                    src={cover}
                    alt={name}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <b>Date:</b> {releaseDate}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <b>Platform:</b> {platformName}
                    </Typography>
                    {
                        storyline &&
                        <Typography variant="subtitle1" color="text.secondary">
                            <b>Storyline:</b> {storyline}
                        </Typography>
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}

export default function VideoGames() {

    const [comingGames, setComingGames] = React.useState([])
    const { getComingVideoGames } = useVideoGamesActions()

    React.useEffect(() => {
        getComingVideoGames(1).then(response => {
            setComingGames(response.data)
        }).catch((ex) => {
            console.log(ex)
            toast.error("Error getting the coming video games")
        })
    }, [getComingVideoGames])

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Next 100 coming video games
            </Typography>
            <Grid container spacing={3}>
                {comingGames.map((comingGame) =>
                (
                    <>
                        {console.log("coming", comingGame)}
                        < VideoGameCard
                            key={comingGame.id}
                            name={comingGame.game.value.name}
                            cover={comingGame.game.value.cover?.value?.url ?? null}
                            releaseDate={comingGame.human}
                            platformName={comingGame.platform.value.name}
                            storyline={comingGame.game.value.storyline} />
                    </>
                )
                )}
            </Grid>
        </>
    )
}

