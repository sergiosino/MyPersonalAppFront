import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { routes } from 'constants/routes'
import jwt from 'jwt-decode'
import { toast } from 'react-toastify'
import { STORAGE_TOKEN } from 'constants/constants'
import AuthContext from 'contexts/AuthContext'
import axios from "axios"
import { getUrlApi } from "hooks/actions/setting"

export function useAuthToken() {
    const { setUserInfo } = useContext(AuthContext)
    const navigate = useNavigate()
    const urlApi = `${getUrlApi()}/Users`

    const validateAndSaveUserInfo = (data) => {
        const userInfo = {
            token: data.idToken,
            email: data.email
        }
        jwt(userInfo.token)
        setUserInfo(userInfo)
    }

    const signUp = (email, password) => {
        axios.post(`${urlApi}/SignUp?email=${email}&password=${password}`)
            .then((response) => {
                try {
                    validateAndSaveUserInfo(response.data)
                    navigate(routes.f1Schedule)
                } catch (error) {
                    logout()
                }
            }).catch((error) => {
                toast.error("Error trying to log in")
                console.log(error)
                localStorage.removeItem(STORAGE_TOKEN)
                setUserInfo(null)
            })
    }

    const signIn = (email, password) => {
        axios.post(`${urlApi}/SignIn?email=${email}&password=${password}`)
            .then((response) => {
                try {
                    validateAndSaveUserInfo(response.data)
                    navigate(routes.f1Schedule)
                } catch (error) {
                    logout()
                }
            }).catch((error) => {
                toast.error("Error trying to log in")
                console.log(error)
                localStorage.removeItem(STORAGE_TOKEN)
                setUserInfo(null)
            })
    }

    const logout = () => {
        localStorage.removeItem(STORAGE_TOKEN)
        setUserInfo(null)
        navigate(routes.f1Schedule)
    }

    return { signIn, signUp, logout }
}