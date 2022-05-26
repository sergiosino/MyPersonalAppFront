import { useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { routes } from '../utils/routes'
import jwt from 'jwt-decode'
import { post } from '../actions/actions'
import { toast } from 'react-toastify'
import { STORAGE_TOKEN } from '../constants/constants'
import AuthTokenContext from '../contexts/AuthTokenContext'

export function useAuthToken() {
    const { setToken } = useContext(AuthTokenContext)
    const navigate = useNavigate()
    const location = useLocation()

    const login = (email, password) => {
        post().login(email, password)
            .then((response) => {
                try {
                    const token = response.data.idToken
                    jwt(token)
                    const from = location.state?.from?.pathname || routes.f1Schedule
                    localStorage.setItem(STORAGE_TOKEN, token)
                    setToken(token)
                    navigate(from, { replace: true })
                } catch (error) {
                    logout()
                }
            }).catch((error) => {
                toast.error("Error trying to log in")
                console.log(error)
                logout()
            });
    }

    const logout = () => {
        localStorage.removeItem(STORAGE_TOKEN)
        setToken(null)
        window.location = routes.login
        navigate(routes.login)
    }

    return { login, logout }
}