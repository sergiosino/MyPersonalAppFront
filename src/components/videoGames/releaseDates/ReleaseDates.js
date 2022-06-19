import * as React from "react"
import { useComingVideoGames } from "hooks/videoGames/useComingVideoGames"
import { Typography } from "@mui/material"
import SearchForm from "../SearchForm";
import GamesList from "../GameList";

export default function ReleaseDates() {
    const { comingVideoGames, setPage, loadingNextPage, loadingGames, isLastPage } = useComingVideoGames()

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

