import jwt from 'jwt-decode'
import { routes } from './routes'

const STORAGE_TOKEN = "token"

export const setToken = (token) => {
    localStorage.setItem(STORAGE_TOKEN, token)
    return verifyToken()
}

export const verifyToken = () => {
    try {
        const token = localStorage.getItem(STORAGE_TOKEN)
        if (token) {
            const userData = jwt(token)
            return userData
        }
    } catch (error) {
        deleteToken()
    }
    return null
}

export const deleteToken = () => {
    localStorage.removeItem(STORAGE_TOKEN)
}

export const getToken = () => {
    return localStorage.getItem(STORAGE_TOKEN)
}