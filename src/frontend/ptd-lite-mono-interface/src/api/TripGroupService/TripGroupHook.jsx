import { useAuth0 } from "@auth0/auth0-react";
import { getAuthConfig } from "../token";
import axiosInstance from "../axios";

const useTripGroupService = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createGroup = async (group) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.post('/group/create', group, {
            ...config
        });
    }

    return {};
}
export default useTripGroupService;