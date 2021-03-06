import { useEffect, useState, useContext } from "react"
import axiosInstance from "utils/axiosInstance"
import { toast } from "react-toastify"
import AuthContext from 'contexts/AuthContext'

export function useAllOffers() {
    const [allOffers, setAllOffers] = useState([])
    const { userInfo } = useContext(AuthContext)

    useEffect(() => {
        axiosInstance.get(
            `/Offers/GetAll`,
            { headers: { Authorization: `bearer ${userInfo.token}` } }
        ).then(response => {
            setAllOffers(response.data)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error getting the actual offers")
        })
    }, [userInfo, setAllOffers])

    return {
        allOffers
    }
}