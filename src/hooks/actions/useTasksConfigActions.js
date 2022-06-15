import { getUrlApi } from "hooks/actions/setting"
import { useAxiosWrapper } from "hooks/useAxiosWrapper"

export function useTasksConfigActions() {
    const axiosWrapper = useAxiosWrapper()
    const urlApi = `${getUrlApi()}/TasksConfig`

    const getTasksConfig = () => axiosWrapper.get(`${urlApi}/Get/otairh8hcDx0lgjkg60l`)
    const putTasksConfig = (tasksConfig) => axiosWrapper.put(`${getUrlApi()}/Put/otairh8hcDx0lgjkg60l`, tasksConfig)

    return {
        getTasksConfig,
        putTasksConfig
    }
}