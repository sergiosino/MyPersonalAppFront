import axios from "axios";
import { getToken, deleteToken } from "../utils/jwtToken";

export const getUrlApi = () => {
    const url = window.location.href;
    if(url.includes("github")) {
        return "https://hodlhodlapi.herokuapp.com/api";
    } else {
        return "https://localhost:44316/api";
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
            deleteToken();
        else
            throw ex;
    });
}

export const get = () => {
    const method = "get";
    return {
        allOffers: () => axiosCall(method, `${getUrlApi()}/offers/getall`),
        bestOffer: () => axiosCall(method, `${getUrlApi()}/offers/getbest`),
        tasksConfig: () => axiosCall(method, `${getUrlApi()}/tasksconfig/get/otairh8hcDx0lgjkg60l`)
    };
}

export const post = () => {
    const method = "post";
    return {
        login: (data) => axiosCall(method, "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6LrlGKQiPrcCLUrSBgEhYR5rh9c_deJg", data)
    };
}

export const put = () => {
    const method = "put";
    return {
        tasksConfig: (data) => axiosCall(method, `${getUrlApi()}/tasksconfig/put/otairh8hcDx0lgjkg60l`, data)
    };
}
