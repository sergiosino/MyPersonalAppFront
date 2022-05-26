
const getRoute = () => {
    const url = window.location.href
    if(url.includes("github")) {
        return "/MyPersonalAppFront"
    } else {
        return ""
    }
}

export const routes = {
    login: `${getRoute()}/login`,
    tasksConfig: `${getRoute()}/tasksConfig`,
    offers: `${getRoute()}/offers`,
    f1Schedule: `${getRoute()}/`,
}