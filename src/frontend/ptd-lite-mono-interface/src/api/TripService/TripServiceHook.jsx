import { useAuth0 } from "@auth0/auth0-react";
import { getAuthConfig } from "../token";
import axiosInstance from "../axios";

const useTripService = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createFixed = async (id, trips) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.post('/trip', trips, {
            params: { cardId: id },
            ...config
        });
    }

    const deleteManyTrips = async (selectedTripId) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.delete("/trip", {
            data: selectedTripId,
            ...config
        });
    }

    const createGroup = async (group) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.post("/group", {
            data: group,
            ...config
        });
    }

    return { createFixed, deleteManyTrips, createGroup };
}
export default useTripService;