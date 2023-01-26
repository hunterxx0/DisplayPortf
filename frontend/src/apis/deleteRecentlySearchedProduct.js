import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const deleteRecentlySearchedProduct = async (toRemove, uid) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.users}/${uid}/search/delete/${toRemove}`
  );
  return response.data;
};
