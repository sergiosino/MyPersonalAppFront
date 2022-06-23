import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { routes } from 'constants/routes'
import jwt from 'jwt-decode'
import { toast } from 'react-toastify'
import AuthContext from 'contexts/AuthContext'
import axiosInstance from "utils/axiosInstance"

export function useAuthToken() {
    const { setUserInfo, deleteUserInfo } = useContext(AuthContext)
    const navigate = useNavigate()
    const apiController = "/Users"

    const validateAndSaveUserInfo = (data) => {
        const userInfo = {
            token: data.idToken,
            email: data.email
        }
        jwt(userInfo.token)
        setUserInfo(userInfo)
    }

    const signUp = (email, password) => {
        axiosInstance.post(`${apiController}/SignUp?email=${email}&password=${password}`)
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
                logout()
            })
    }

    const signIn = (email, password) => {
        axiosInstance.post(`${apiController}/SignIn?email=${email}&password=${password}`)
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
                logout()
            })
    }

    const logout = () => {
        deleteUserInfo()
        navigate(routes.f1Schedule)
    }

    return { signIn, signUp, logout }
}