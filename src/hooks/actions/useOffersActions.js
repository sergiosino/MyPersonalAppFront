import { getUrlApi } from "hooks/actions/setting"
import { useAxiosWrapper } from "hooks/useAxiosWrapper"

export function useOffersActions() {
    const axiosWrapper = useAxiosWrapper()
    const urlApi = `${getUrlApi()}/Offers`

    const getAllOffers = () => axiosWrapper.get(`${urlApi}/GetAll`)
    const getBestOffer = () => axiosWrapper.get(`${urlApi}/GetBest`)

    return {
        getAllOffers,
        getBestOffer
    }
}