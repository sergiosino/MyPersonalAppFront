import { useEffect, useState } from "react"
import { getUrlApi } from "hooks/actions/setting"
import { useAxiosWrapper } from "hooks/useAxiosWrapper"
import { toast } from "react-toastify"

const INITIAL_PAGE = 1

export function useSearchGames(props) {
    const { keyword, platformId } = props

    const [searchGames, setSearchGames] = useState([])
    const [loadingSearch, setLoadingSearch] = useState(false)
    const axiosWrapper = useAxiosWrapper()
    const urlApi = `${getUrlApi()}/VideoGames`

    const searchGamesAction = (keyword, platformId, pageNumber) => axiosWrapper.get(`${urlApi}/Search?keyword=${keyword}&platformId=${platformId}&pageNumber=${pageNumber}`)

    useEffect(() => {
        if (keyword === "" && platformId === "") return
        setLoadingSearch(true)
        searchGamesAction(keyword, platformId, INITIAL_PAGE).then(response => {
            setSearchGames(response.data)
            setLoadingSearch(false)
        }).catch((ex) => {
            console.log(ex)
            setSearchGames([])
            toast.error("Error getting the result of the search")
            setLoadingSearch(false)
        })
    }, [setSearchGames, keyword, platformId])

    return {
        loadingSearch,
        searchGames,
    }
}