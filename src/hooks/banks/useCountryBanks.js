import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axiosInstance from "utils/axiosInstance"

export function useCountryBanks() {
    const [countryBanks, setCountryBanks] = useState([])
    const [countryIso, setCountryIso] = useState(null)
    const [loading, setLoading] = useState(false)

    const getAllBanks = (countryCode) => axiosInstance.get(`/Banks/GetAll?countryCode=${countryCode}`)

    useEffect(() => {
        if (!countryIso) return

        setLoading(true)
        getAllBanks(countryIso).then(response => {
            setCountryBanks(response.data)
            setLoading(false)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error getting the banks from that country")
            setLoading(false)
        })
    }, [setCountryBanks, countryIso])

    return {
        countryBanks,
        loading,
        setCountryIso
    }
}