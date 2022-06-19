import * as React from "react"
import { Typography } from "@mui/material"
import SearchForm from "../SearchForm"
import GamesList from "../GameList"
import { useSearchGames } from "hooks/videoGames/useSearchGames"
import { useParams } from "react-router-dom"

export default function SearchResults() {
    const { platformId, keyword } = useParams()
    const { searchGames, loadingSearch } = useSearchGames({ platformId, keyword })

    return (
        <>
            <SearchForm />
            <Typography variant="h5" sx={{ my: 2 }}>
                Search results
            </Typography>
            <GamesList games={searchGames} loadingGames={loadingSearch} />
        </>
    )
}

