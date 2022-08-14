import React, { useContext } from "react"
import GameCard, { CardSkeleton } from "./GameCard"
import { Grid, Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useFavGames } from "hooks/games/useFavGames"
import { useNavigate } from "react-router-dom"
import { routes } from 'constants/routes'
import AuthContext from 'contexts/AuthContext'
import { toast } from 'react-toastify'

const LOADING_NUMBER_GAMES = 25

export default function GamesList(props) {
    const { games, setPage, loadingNextPage, loadingGames, isLastPage } = props

    const { favs, addFav, deleteFav } = useFavGames()
    const navigate = useNavigate()
    const { userInfo } = useContext(AuthContext)

    console.log(favs)

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1)
    }

    const redirectLogin = () => {
        navigate(routes.login)
        toast.info("Sign in or sign up to add games to favorites")
    }

    const handleAddFav = (gameId) => {
        if (userInfo)
            addFav(gameId)
        else
            redirectLogin()
    }

    const handleDelteFav = (gameId) => {
        if (userInfo)
            deleteFav(gameId)
        else
            redirectLogin()
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
                                favourite={favs.includes(game.id)}
                                handleAddFav={handleAddFav}
                                handleDelteFav={handleDelteFav}
                            />
                        </Grid>
                    ) : (
                        <Grid key={index} item xs={12} sm={6} lg={4}>
                            <CardSkeleton />
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

