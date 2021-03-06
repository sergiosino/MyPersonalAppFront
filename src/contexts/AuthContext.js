import React from 'react'
import { STORAGE_TOKEN } from 'constants/constants'

const AuthContext = React.createContext({})

export function AuthContextProvider({ children }) {
    const [user, setUser] = React.useState(localStorage.getItem(STORAGE_TOKEN))

    const userInfo = JSON.parse(user)

    const setUserInfo = (data) => {
        const stringifyData = JSON.stringify(data)
        localStorage.setItem(STORAGE_TOKEN, stringifyData)
        setUser(stringifyData)
    }

    const deleteUserInfo = () => {
        localStorage.removeItem(STORAGE_TOKEN)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo, deleteUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext