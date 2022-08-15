import { useEffect, useState, useContext } from "react"
import { toast } from "react-toastify"
import axiosInstance from "utils/axiosInstance"
import AuthContext from 'contexts/AuthContext'

export function useLinkedBanks() {
    const [linkedBanks, setLinkedBanks] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingEditAccount, setLoadingEditAccount] = useState(false)

    const { userInfo } = useContext(AuthContext)

    const getAllLinkedBanks = () => axiosInstance.get(`/Banks/GetLinkedBanksInfo?user=${userInfo.email}`)
    const deleteLinkedBankById = (linkedBankId) => axiosInstance.delete(`/Banks/DeleteLinkedBank?user=${userInfo.email}&linkedBankId=${linkedBankId}`)
    const editAccountCall = (accountInfo) => axiosInstance.post(`/Accounts/SaveAccountInfo?user=${userInfo.email}`, accountInfo)

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
        deleteLinkedBankById(bankId).then(() => {
            setLinkedBanks(prev => prev.filter(x => x.id !== bankId))
            toast.success("Linked bank deleted")
        }).catch(ex => {
            console.log(ex)
            toast.error("Error deleting the linked bank")
        })
    }

    const editAccount = (accountInfo, completedOk) => {
        setLoadingEditAccount(true)
        editAccountCall(accountInfo).then(() => {
            setLinkedBanks(prev => prev.map(
                x => {
                    return {
                        ...x,
                        accounts: x.accounts.map(a => a.id === accountInfo.id ? { ...a, name: accountInfo.name, otherComments: accountInfo.otherComments } : a)
                    }
                }))
            setLoadingEditAccount(false)
            if (completedOk) completedOk()
            toast.success("Account edited")
        }).catch(ex => {
            console.log(ex)
            toast.error("Error editing the account info")
            setLoadingEditAccount(false)
        })
    }

    return {
        linkedBanks,
        loading,
        deleteLinkedBank,
        editAccount
    }
}