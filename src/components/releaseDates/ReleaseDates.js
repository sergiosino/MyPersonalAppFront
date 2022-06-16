import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { toast } from 'react-toastify'
import { useVideoGamesActions } from "hooks/actions/useVideoGamesActions"
import Skeleton from '@mui/material/Skeleton';

function ReleaseDateCard(props) {
    const { id, name, coverUrl, releaseDate, platformNames } = props

    const handleCardClick = () => {
        if (id)
            alert(id)
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex' }} onClick={handleCardClick}>
                {id ? (
                    <CardMedia
                        component="img"
                        sx={{ width: "20%", maxWidth: 150 }}
                        src={coverUrl}
                    />
                ) : (
                    <Skeleton variant="rectangular" width="20%" height={102} />
                )}
                <CardContent sx={{ flex: 1 }}>
                    {id ? (
                        <>
                            <Typography variant="subtitle2">
                                <b>{name}</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Date: {releaseDate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Platform: {platformNames}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Skeleton variant="text" height={22} />
                            <Skeleton variant="text" height={20} width="60%" />
                            <Skeleton variant="text" height={20} width="60%" />
                        </>
                    )}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default function ReleaseDates() {
    const [releaseDates, setReleaseDates] = React.useState(Array.from(new Array(21)))
    const { getComingVideoGames } = useVideoGamesActions()

    React.useEffect(() => {
        getComingVideoGames(1).then(response => {
            setReleaseDates(response.data)
        }).catch((ex) => {
            console.log(ex)
            toast.error("Error getting the coming video games")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Next 100 coming video games
            </Typography>
            <Grid container spacing={3}>
                {releaseDates.map((releaseDate, index) =>
                    releaseDate ? (
                        <ReleaseDateCard
                            key={releaseDate.id}
                            id={releaseDate.id}
                            name={releaseDate.game.name}
                            coverUrl={releaseDate.game.cover?.url ?? null}
                            releaseDate={releaseDate.releaseDate}
                            platformNames={releaseDate.platformShortNames}
                        />
                    ) : (
                        <ReleaseDateCard key={index} />
                    )
                )}
            </Grid>
        </>
    )
}

