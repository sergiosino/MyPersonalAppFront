import * as React from "react"
import GameCard, { ReleaseDateCardSkeleton } from "./GameCard"
import { Grid, Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';

const LOADING_NUMBER_GAMES = 25

export default function GamesList(props) {
    const { games, setPage, loadingNextPage, loadingGames, isLastPage } = props;

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1)
    }

    return (
        <>
            <Grid container spacing={2}>
                {(loadingGames ? Array.from(new Array(LOADING_NUMBER_GAMES)) : games).map((game, index) =>
                    game ? (
                        <Grid key={game.id} item xs={12} sm={6} lg={4}>
                            <GameCard
                                id={game.id}
                                name={game.name}
                                coverUrl={game.cover?.url ?? null}
                                releaseDate={game.releaseDates[0].releaseDate}
                                platformNames={game.releaseDates[0].platformShortNames}
                            />
                        </Grid>
                    ) : (
                        <Grid key={index} item xs={12} sm={6} lg={4}>
                            <ReleaseDateCardSkeleton />
                        </Grid>
                    )
                )}
            </Grid>
            {!loadingGames && games.length > 0 && !isLastPage &&
                <Box sx={{ p: 5, textAlign: "center" }}>
                    <LoadingButton variant="contained" loading={loadingNextPage} onClick={handleNextPage}>
                        Load more
                    </LoadingButton>
                </Box>
            }
        </>
    )
}
