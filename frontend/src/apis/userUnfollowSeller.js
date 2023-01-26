import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const userUnfollowSeller = async (uid, sellerId) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.users}/${uid}/follow/${sellerId}`
  );
  return response.data;
};
