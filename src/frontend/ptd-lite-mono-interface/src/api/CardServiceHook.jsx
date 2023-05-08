import { useAuth0 } from "@auth0/auth0-react";
import { getAuthConfig } from "./token";
import axiosInstance from "./axios";

const useCardService = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createCard = async (card, year, month, dayOfMonth) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.post('/card/add', card, {
            params: {
                year: year,
                month: month,
                dayOfMonth: dayOfMonth
            },
            ...config
        })
    }

    return { createCard };
}

export default useCardService;