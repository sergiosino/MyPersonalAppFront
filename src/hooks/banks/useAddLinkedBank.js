import { useState, useContext } from "react"
import { toast } from "react-toastify"
import axiosInstance from "utils/axiosInstance"
import AuthContext from 'contexts/AuthContext'

const getWebUrl = () => {
    const url = window.location.href
    if (url.includes("vercel")) {
        return "https://mypersonalapp.vercel.app"
    } else {
        return "http://localhost:3000"
    }
}

export function useAddLinkedBank() {
    const [loadingAddLinkedBank, setLoadingAddLinkedBank] = useState(false)
    const { userInfo } = useContext(AuthContext)

    const linkBank = (linkedBankId) => axiosInstance.post(`/Banks/LinkBank?user=${userInfo.email}&redirectUri=${getWebUrl()}/mybankaccounts&linkedBankId=${linkedBankId}`)

    const linkNewBank = (bankId) => {
        setLoadingAddLinkedBank(true)
        linkBank(bankId).then(reponse => {
            window.location.replace(reponse.data.link)
            setLoadingAddLinkedBank(false)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error adding the linked bank")
            setLoadingAddLinkedBank(false)
        })
    }

    return {
        linkNewBank,
        loadingAddLinkedBank
    }
}