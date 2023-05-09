import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from "../axios";
import { getAuthConfig } from "../token";

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

    const getCards = async (username, year, month) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return await axiosInstance.get('/card/all', {
            params: {
                username: username,
                year: year,
                month: month
            },
            ...config
        });
    }

    const deleteCard = async (cardId) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.delete('/card/delete', {
            params: { cardId: cardId },
            ...config
        })
    }

    const getTripFromCard = async (id) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.get('/card/trip', {
            params: { id: id },
            ...config
        })
    };

    const getFuelFromCard = async (id) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.get('/card/fuel', {
            params: { id: id },
            ...config
        })
    };

    return { createCard, getCards, deleteCard, getTripFromCard, getFuelFromCard };
}

export default useCardService;