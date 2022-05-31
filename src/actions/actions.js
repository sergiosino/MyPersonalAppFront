import axios from "axios"
import { getToken, deleteToken } from "../utils/jwtToken"

const getUrlApi = () => {
    const url = window.location.href
    if(url.includes("github")) {
        return "https://mypersonalappapi.herokuapp.com/api"
    } else {
        return "https://localhost:44316/api"
    }
}

const axiosCall = (method, url, data) => {
    const config = {
        url: url,
        method: method,
        headers: {
            Authorization: `bearer ${getToken()}`
        },
        data: data
    }
    return axios.request(config).catch((ex) => {
        if (ex.response.status === 401)
            deleteToken()
        else
            throw ex
    })
}

export const get = () => {
    const method = "get"
    return {
        allOffers: () => axiosCall(method, `${getUrlApi()}/Offers/GetAll`),
        bestOffer: () => axiosCall(method, `${getUrlApi()}/Offers/GetBest`),
        tasksConfig: (id) => axiosCall(method, `${getUrlApi()}/TasksConfig/Get/${id}`)
    }
}

export const post = () => {
    // const method = "post"
    return {
        login: (email, password) => axios.post(`${getUrlApi()}/Users/SignIn?email=${email}&password=${password}`)
    }
}

export const put = () => {
    const method = "put"
    return {
        tasksConfig: (id, data) => axiosCall(method, `${getUrlApi()}/TasksConfig/Put/${id}`, data)
    }
}
