import { getUrlApi } from "hooks/actions/setting"
import { useAxiosWrapper } from "hooks/useAxiosWrapper"

export function useVideoGamesActions() {
    const axiosWrapper = useAxiosWrapper()
    const urlApi = `${getUrlApi()}/VideoGames`

    const getPlatforms = () => axiosWrapper.get(`${urlApi}/GetPlatforms`)
    const getComingVideoGames = (pageNumber) => axiosWrapper.get(`${urlApi}/GetComingVideoGames?pageNumber=${pageNumber}`)

    return {
        getPlatforms,
        getComingVideoGames
    }
}