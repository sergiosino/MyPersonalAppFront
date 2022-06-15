import { useContext } from "react"
import AuthContext from 'contexts/AuthContext'
import { useAuthToken } from "hooks/useAuthToken"
import axios from "axios"

export function useAxiosWrapper() {
    const { userInfo } = useContext(AuthContext)
    const authToken = useAuthToken()

    const request = (method) => {
        return (url, body) => {
            const config = {
                url: url,
                method: method,
                headers: authorizationHeader(),
                data: body
            }
            return axios.request(config).catch((ex) => {
                console.log(ex)
                if (ex.response.status === 401)
                    authToken.logout()
                else
                    throw ex
            })
        }
    }

    const authorizationHeader = () => {
        if (userInfo)
            return { Authorization: `bearer ${userInfo.token}` }
        else
            return {}
    }

    return {
        get: request("get"),
        post: request("post"),
        put: request("put"),
        delete: request("delete")
    }
}
