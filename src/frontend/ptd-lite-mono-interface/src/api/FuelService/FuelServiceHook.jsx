import { useAuth0 } from '@auth0/auth0-react';
import { getAuthConfig } from '../token';
import axiosInstance from '../axios';

const useFuelService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createFuel = async (id, fuel) => {
    const config = await getAuthConfig(getAccessTokenSilently);
    return axiosInstance.post('/fuel/petrol/add', fuel, {
      params: { cardId: id },
      ...config,
    });
  };

  const createAdBlue = async (cardId, blue) => {
    const config = await getAuthConfig(getAccessTokenSilently);
    return axiosInstance.post('/fuel/blue/add', blue, {
      params: { cardId: cardId },
      ...config,
    });
  };

  const deleteFuel = async (id) => {
    const config = await getAuthConfig(getAccessTokenSilently);
    return axiosInstance.delete('/fuel/petrol/delete', {
      params: { fuelId: id },
      ...config,
    });
  };

  const deleteAdBlue = async (blueId, cardId) => {
    const config = await getAuthConfig(getAccessTokenSilently);
    return axiosInstance.delete('/fuel/blue/delete', {
      params: { cardId: cardId, blueId: blueId },
      ...config,
    });
  };

  return { createFuel, createAdBlue, deleteFuel, deleteAdBlue };
};
export default useFuelService;
