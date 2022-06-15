import { getUrlApi } from "hooks/actions/setting"
import { useAxiosWrapper } from "hooks/useAxiosWrapper"

export function useOffersActions() {
    const axiosWrapper = useAxiosWrapper()
    const urlApi = `${getUrlApi()}/Offers`

    const getAllOffers = () => axiosWrapper.getAuth(`${urlApi}/GetAll`)
    const getBestOffer = () => axiosWrapper.getAuth(`${urlApi}/GetBest`)

    return {
        getAllOffers,
        getBestOffer
    }
}