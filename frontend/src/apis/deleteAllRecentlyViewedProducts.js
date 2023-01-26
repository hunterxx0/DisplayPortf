import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const deleteAllRecentlyViewedProducts = async (uid) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.users}/${uid}/views/clear`
  );
  return response.data;
};
