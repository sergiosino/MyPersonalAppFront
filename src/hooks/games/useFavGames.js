import { useState, useEffect, useContext } from "react"
import axiosInstance from "utils/axiosInstance"
import { toast } from 'react-toastify'
import AuthContext from 'contexts/AuthContext'

export function useFavGames() {
    const [favs, setFavs] = useState([])
    const { userInfo } = useContext(AuthContext)
    const apiController = "/Games"

    useEffect(() => {
        if (userInfo) {
            axiosInstance.get(
                `${apiController}/Favs?user=${userInfo.email}`,
                { headers: { Authorization: `bearer ${userInfo.token}` } }
            ).then(response => {
                setFavs(response.data)
            }).catch(ex => {
                console.log(ex)
                toast.error("Error getting game favs")
            })
        }
    }, [userInfo])

    const addFav = (gameId) => {
        if (userInfo) {
            axiosInstance.post(
                `${apiController}/AddFav?user=${userInfo.email}&gameId=${gameId}`,
                {},
                { headers: { Authorization: `bearer ${userInfo.token}` } }
            ).catch(ex => {
                console.log(ex)
                toast.error("Error adding game fav")
            })
        }
    }

    const deleteFav = (gameId) => {
        if (userInfo) {
            axiosInstance.delete(
                `${apiController}/DeleteFav?user=${userInfo.email}&gameId=${gameId}`,
                { headers: { Authorization: `bearer ${userInfo.token}` } }
            ).catch(ex => {
                console.log(ex)
                toast.error("Error deleting game fav")
            })
        }
    }

    return {
        favs,
        addFav,
        deleteFav
    }
}