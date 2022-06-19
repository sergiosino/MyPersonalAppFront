import { useEffect, useState } from "react"
import { getUrlApi } from "hooks/actions/setting"
import { useAxiosWrapper } from "hooks/useAxiosWrapper"
import { toast } from "react-toastify"

export function usePlatforms() {
    const [platforms, setPlatforms] = useState(undefined)
    const axiosWrapper = useAxiosWrapper()
    const urlApi = `${getUrlApi()}/VideoGames`

    const getPlatforms = () => axiosWrapper.get(`${urlApi}/Platforms`)

    useEffect(() => {
        getPlatforms().then(response => {
            setPlatforms(response.data)
        }).catch((ex) => {
            console.log(ex)
            setPlatforms([])
            toast.error("Error getting the coming video games")
        })
    }, [setPlatforms])

    return {
        platforms,
    }
}