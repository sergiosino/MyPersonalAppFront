import * as React from "react"
import { useComingGames } from "hooks/games/useComingGames"
import { Typography } from "@mui/material"
import SearchForm from "../common/SearchForm";
import GamesList from "../common/GameList";

export default function ReleaseDates() {
    const { comingVideoGames, setPage, loadingNextPage, loadingGames, isLastPage } = useComingGames()

    return (
        <>
            <SearchForm />
            <Typography variant="h5" sx={{ my: 2 }}>
                Coming video games
            </Typography>
            <GamesList
                games={comingVideoGames}
                setPage={setPage}
                loadingNextPage={loadingNextPage}
                loadingGames={loadingGames}
                isLastPage={isLastPage}
            />
        </>
    )
}

