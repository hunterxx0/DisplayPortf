import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const addRecentlySearchedProduct = async (recentlySearched, uid) => {
  const response = await axios.patch(
    `${API_ENDPOINTS.users}/${uid}/search/${recentlySearched}`
  );

  return response.data;
};
