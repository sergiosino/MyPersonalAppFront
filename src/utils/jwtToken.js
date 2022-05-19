import jwt from 'jwt-decode';

export const setToken = (token) => {
    sessionStorage.setItem("token", token);
}

export const verifyToken = () => {
    try {
        const token = sessionStorage.getItem("token");
        if (token) {
            const userData = jwt(token);
            if (userData)
                return true;
        }
    } catch (error) {
        deleteToken();
    }
    return false;
}

export const deleteToken = () => {
    sessionStorage.removeItem("token");
    window.location = "/";
}

export const getToken = () => {
    return sessionStorage.getItem("token");
}