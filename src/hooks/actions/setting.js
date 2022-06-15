
export const getUrlApi = () => {
    const url = window.location.href
    if(url.includes("vercel")) {
        return "https://mypersonalappapi.herokuapp.com/api"
    } else {
        return "https://localhost:44316/api"
    }
}