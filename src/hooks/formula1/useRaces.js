import { useEffect, useState } from "react"
import axiosInstance from "utils/axiosInstance"
import { toast } from "react-toastify"

export function useRaces(props) {
    const { year } = props

    const [races, setRaces] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosInstance.get(`Formula1/GetAllRacesInfo?year=${year}`).then(response => {
            setRaces(response.data)
            setLoading(false)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error getting the races info")
            setLoading(false)
        })
    }, [setRaces, setLoading, year])

    return {
        races,
        loading
    }
}