import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const deleteAllRecentlySearchedProducts = async (uid) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.users}/${uid}/search/clear`
  );
  return response.data;
};
