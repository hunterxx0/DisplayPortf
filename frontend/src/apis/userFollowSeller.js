import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const userFollowSeller = async (uid, sellerId) => {
  const response = await axios.patch(
    `${API_ENDPOINTS.users}/${uid}/follow/${sellerId}`
  );
  return response.data;
};
