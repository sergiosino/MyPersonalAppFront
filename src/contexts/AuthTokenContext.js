import React from 'react'
import { STORAGE_TOKEN } from '../constants/constants'

const AuthTokenContext = React.createContext({})

export function AuthTokenContextProvider({ children }) {
    const [token, setToken] = React.useState(localStorage.getItem(STORAGE_TOKEN))

    return (
        <AuthTokenContext.Provider value={{ token, setToken }}>
            {children}
        </AuthTokenContext.Provider>
    )
}

export default AuthTokenContext