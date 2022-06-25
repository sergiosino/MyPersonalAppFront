import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axiosInstance from "utils/axiosInstance"

const INITIAL_PAGE = 1

export function useComingGames() {
    const [comingVideoGames, setComingVideoGames] = useState([])
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [loadingGames, setLoadingGames] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)

    const getComingVideoGames = (pageNumber) => axiosInstance.get(`/Games/Coming?pageNumber=${pageNumber}`)

    useEffect(() => {
        setLoadingGames(true)
        getComingVideoGames(INITIAL_PAGE).then(response => {
            setComingVideoGames(response.data)
            setLoadingGames(false)
        }).catch((ex) => {
            console.log(ex)
            toast.error("Error getting the coming video games")
            setLoadingGames(false)
        })
    }, [setComingVideoGames])

    useEffect(() => {
        if (page === INITIAL_PAGE) return

        setLoadingNextPage(true)
        getComingVideoGames(page).then(response => {
            if (response.data.length > 0)
                setComingVideoGames((prevComingVideoGames) => prevComingVideoGames.concat(response.data))
            else
                setIsLastPage(true)
            setLoadingNextPage(false)
        }).catch((ex) => {
            console.log(ex)
            toast.error("Error getting the next page of coming video games")
            setLoadingNextPage(false)
        })
    }, [page, setComingVideoGames, setLoadingNextPage, setIsLastPage])

    return {
        loadingGames,
        comingVideoGames,
        loadingNextPage,
        setPage,
        isLastPage
    }
}