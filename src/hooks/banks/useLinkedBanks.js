import { useEffect, useState, useContext } from "react"
import { toast } from "react-toastify"
import axiosInstance from "utils/axiosInstance"
import AuthContext from 'contexts/AuthContext'

export function useLinkedBanks() {
    const [linkedBanks, setLinkedBanks] = useState([])
    const [loading, setLoading] = useState(false)
    const { userInfo } = useContext(AuthContext)

    const getAllLinkedBanks = () => axiosInstance.get(`/Banks/GetLinkedBanksInfo?user=${userInfo.email}`)
    const deleteLinkedBankById = (linkedBankId) => axiosInstance.delete(`/Banks/DeleteLinkedBank?user=${userInfo.email}&linkedBankId=${linkedBankId}`)

    useEffect(() => {
        setLoading(true)
        getAllLinkedBanks().then(response => {
            setLinkedBanks(response.data)
            setLoading(false)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error getting the linked banks")
            setLoading(false)
        })
    }, [setLinkedBanks, setLoading])

    const deleteLinkedBank = (bankId) => {
        deleteLinkedBankById(bankId).then(reponse => {
            setLinkedBanks(prev => prev.filter(x => x.id !== bankId))
            toast.success("Linked bank deleted")
        }).catch(ex => {
            console.log(ex)
            toast.error("Error deleting the linked bank")
        })
    }

    return {
        linkedBanks,
        loading,
        deleteLinkedBank
    }
}