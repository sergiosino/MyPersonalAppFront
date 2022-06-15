import { useContext } from "react"
import AuthContext from 'contexts/AuthContext'
import { useAuthToken } from "hooks/useAuthToken"
import axios from "axios"

export function useAxiosWrapper() {
    const { userInfo } = useContext(AuthContext)
    const authToken = useAuthToken()

    const requestAuth = (method, auth) => {
        return (url, body) => {
            let config = {
                url: url,
                method: method,
                headers: auth ? authorizationHeader() : null,
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
        get: requestAuth("get", false),
        post: requestAuth("post", false),
        put: requestAuth("put", false),
        delete: requestAuth("delete", false),
        getAuth: requestAuth("get", true),
        postAuth: requestAuth("post", true),
        putAuth: requestAuth("put", true),
        deleteAuth: requestAuth("delete", true)
    }
}
