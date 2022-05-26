import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { routes } from '../utils/routes'
import jwt from 'jwt-decode'
import { post } from '../actions/actions'
import { toast } from 'react-toastify'
import { STORAGE_TOKEN } from '../constants/constants'
import AuthTokenContext from '../contexts/AuthTokenContext'

export function useAuthToken() {
    const { setToken } = useContext(AuthTokenContext)
    const navigate = useNavigate()

    const login = (email, password) => {
        post().login(email, password)
            .then((response) => {
                try {
                    const token = response.data.idToken
                    jwt(token)
                    localStorage.setItem(STORAGE_TOKEN, token)
                    setToken(token)
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
        localStorage.removeItem(STORAGE_TOKEN)
        setToken(null)
        navigate(routes.f1Schedule)
    }

    return { login, logout }
}