import { axiosInstance } from './axiosConfig'

export const getLastThreeCardsByUser = async (username, token) => {
  return axiosInstance.get('/card/last', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { username },
  })
}

export const getCardSpecification = async (cardId, token) => {
  return axiosInstance.get('/card/details', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { id: cardId },
  })
}
