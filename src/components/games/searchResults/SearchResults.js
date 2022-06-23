import * as React from "react"
import { Grid } from "@mui/material"
import SearchForm from "../common/SearchForm"
import GamesList from "../common/GameList"
import { useSearchGames } from "hooks/games/useSearchGames"
import { useParams } from "react-router-dom"

export default function SearchResults() {
    const { keyword } = useParams()
    const { searchGames, loadingSearch, setPage, loadingNextPage, isLastPage } = useSearchGames({ keyword })

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <SearchForm />
            </Grid>
            <Grid item xs={12}>
                <GamesList
                    games={searchGames}
                    loadingGames={loadingSearch}
                    setPage={setPage}
                    loadingNextPage={loadingNextPage}
                    isLastPage={isLastPage}
                />
            </Grid>
        </Grid>
    )
}

