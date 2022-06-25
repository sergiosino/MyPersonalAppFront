import { useEffect, useState } from "react"
import axiosInstance from "utils/axiosInstance"
import { toast } from "react-toastify"

const INITIAL_PAGE = 1

export function useSearchGames(props) {
    const { keyword } = props

    const [searchGames, setSearchGames] = useState([])
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)

    const searchGamesAction = (keyword, pageNumber) => axiosInstance.get(`/Games/Search?keyword=${keyword}&pageNumber=${pageNumber}`)

    useEffect(() => {
        if (keyword === "") return

        setLoadingSearch(true)
        searchGamesAction(keyword, INITIAL_PAGE).then(response => {
            setSearchGames(response.data)
            setLoadingSearch(false)
            setIsLastPage(false)
        }).catch((ex) => {
            console.log(ex)
            setSearchGames([])
            toast.error("Error getting the result of the search")
            setLoadingSearch(false)
            setIsLastPage(false)
        })
    }, [setSearchGames, keyword])

    useEffect(() => {
        if (page === INITIAL_PAGE) return

        setLoadingNextPage(true)
        searchGamesAction(keyword, page).then(response => {
            if (response.data.length > 0)
                setSearchGames((prevSearchGames) => prevSearchGames.concat(response.data))
            else
                setIsLastPage(true)
            setLoadingNextPage(false)
        }).catch((ex) => {
            console.log(ex)
            setSearchGames([])
            toast.error("Error getting the result of the search")
            setLoadingNextPage(false)
        })
    }, [page, keyword, setLoadingNextPage, setSearchGames])

    return {
        loadingSearch,
        searchGames,
        setPage,
        loadingNextPage,
        isLastPage
    }
}