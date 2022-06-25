import { useEffect } from "react"
import { useAuthToken } from "hooks/user/useAuthToken"
import axios from "axios"

const getUrlApi = () => {
    const url = window.location.href
    if (url.includes("vercel")) {
        return "https://mypersonalappapi.herokuapp.com/api"
    } else {
        return "https://localhost:44316/api"
    }
}

const axiosInstance = axios.create({
    baseURL: getUrlApi()
})

export function AxiosInterceptor(props) {
    const { children } = props
    const { logout } = useAuthToken()

    const responseInterceptor = (response) => {
        return response;
    }

    const errorInterceptor = (error) => {
        debugger
        if (error.response.status === 401)
            logout()
        else
            throw error;
    }

    const axiosResponseInterceptor = axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor)

    useEffect(() => {
        return () => axiosInstance.interceptors.response.eject(axiosResponseInterceptor)
    }, [axiosResponseInterceptor])

    return children
}

export default axiosInstance