import { useEffect, useState } from "react"
import axiosInstance from "utils/useAxiosWrapper"
import { toast } from "react-toastify"

export function usePlatforms() {
    const [platforms, setPlatforms] = useState(undefined)

    const getPlatforms = () => axiosInstance.get(`/Games/Platforms`)

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