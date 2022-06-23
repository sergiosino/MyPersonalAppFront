import { useEffect, useState, useContext } from "react"
import axiosInstance from "utils/axiosInstance"
import { toast } from "react-toastify"
import AuthContext from 'contexts/AuthContext'

export function useAllOffers() {
    const [allOffers, setAllOffers] = useState([])
    const { userInfo } = useContext(AuthContext)
    const apiController = "/Offers"

    useEffect(() => {
        axiosInstance.get(
            `${apiController}/GetAll`,
            { headers: { Authorization: `bearer ${userInfo.token}` } }
        ).then(response => {
            debugger
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