import { useState, useEffect, useContext } from "react"
import axiosInstance from "utils/axiosInstance"
import { toast } from 'react-toastify'
import AuthContext from 'contexts/AuthContext'

export function useTasksConfig() {
    const [tasksConfig, setTasksConfig] = useState(null)
    const { userInfo } = useContext(AuthContext)
    const apiController = "/TasksConfig"

    useEffect(() => {
        axiosInstance.get(
            `${apiController}/Get?id=otairh8hcDx0lgjkg60l`,
            { headers: { Authorization: `bearer ${userInfo.token}` } }
        ).then(response => {
            setTasksConfig(response.data)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error getting tasks configuration")
        })
    }, [userInfo])

    const updateTasksConfig = (tasksConfig) => {
        axiosInstance.put(
            `${apiController}/Put?id=otairh8hcDx0lgjkg60l`,
            tasksConfig,
            { headers: { Authorization: `bearer ${userInfo.token}` } }
        ).then(() => {
            toast.success("Tasks configuration saved")
        }).catch(ex => {
            console.log(ex)
            toast.error("Error saving tasks config")
        })
    }

    return {
        tasksConfig,
        updateTasksConfig
    }
}