import { useEffect, useState } from "react"
import { getUrlApi } from "hooks/actions/setting"
import { useAxiosWrapper } from "hooks/useAxiosWrapper"
import { toast } from "react-toastify"

const INITIAL_PAGE = 1

export function useComingVideoGames() {
    const [comingVideoGames, setComingVideoGames] = useState([])
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [loadingGames, setLoadingGames] = useState(false)
    const axiosWrapper = useAxiosWrapper()
    const urlApi = `${getUrlApi()}/VideoGames`

    const getComingVideoGames = (pageNumber) => axiosWrapper.get(`${urlApi}/ComingReleaseDates?pageNumber=${pageNumber}`)

    useEffect(() => {
        setLoadingGames(true)
        getComingVideoGames(INITIAL_PAGE).then(response => {
            setComingVideoGames(response.data)
            setLoadingGames(false)
        }).catch((ex) => {
            console.log(ex)
            setComingVideoGames([])
            toast.error("Error getting the coming video games")
            setLoadingGames(false)
        })
    }, [setComingVideoGames])

    useEffect(() => {
        if (page === INITIAL_PAGE) return

        setLoadingNextPage(true)
        getComingVideoGames(page).then(response => {
            setComingVideoGames((prevComingVideoGames) => prevComingVideoGames.concat(response.data))
            setLoadingNextPage(false)
        }).catch((ex) => {
            console.log(ex)
            setComingVideoGames([])
            toast.error("Error getting the next page of coming video games")
            setLoadingNextPage(false)
        })
    }, [page, setComingVideoGames, setLoadingNextPage])

    return {
        loadingGames,
        comingVideoGames,
        loadingNextPage,
        setPage
    }
}