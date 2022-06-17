import * as React from "react"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { toast } from "react-toastify"
import { useVideoGamesActions } from "hooks/actions/useVideoGamesActions"
import ReleaseDateCard from "components/releaseDates/releaseDateCard/ReleaseDateCard"
import ReleaseDateCardSkeleton from "components/releaseDates/releaseDateCard/ReleaseDateCardSkeleton"

export default function ReleaseDates() {
    const [releaseDates, setReleaseDates] = React.useState(Array.from(new Array(21)))
    const { getComingVideoGames } = useVideoGamesActions()

    React.useEffect(() => {
        getComingVideoGames(1).then(response => {
            setReleaseDates(response.data)
        }).catch((ex) => {
            console.log(ex)
            setReleaseDates([])
            toast.error("Error getting the coming video games")
        })
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
                        <ReleaseDateCardSkeleton key={index} />
                    )
                )}
            </Grid>
        </>
    )
}

