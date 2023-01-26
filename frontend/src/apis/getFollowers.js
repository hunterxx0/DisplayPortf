import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const getFollowers = async (sellerName) => {
  const response = await axios.get(
    `${API_ENDPOINTS.sellers}/${sellerName}/followers`
  );
  return response.data;
};
