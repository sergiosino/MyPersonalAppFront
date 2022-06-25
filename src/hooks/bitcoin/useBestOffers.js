import {useEffect, useState} from "react"
import axiosInstance from "utils/useAxiosWrapper"
import { toast } from "react-toastify"

export default function useBestOffers() {
    const [bestOffers, setBestOffers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosInstance.get(`/Offers/GetBest`).then(response => {
            setBestOffers(response.data)
            setLoading(false)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error getting the actual offers")
            setLoading(false)
        })
    }, [setLoading, setBestOffers])

    return {
        bestOffers,
        loading
    }
}