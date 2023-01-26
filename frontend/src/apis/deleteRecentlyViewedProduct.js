import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const deleteRecentlyViewedProduct = async (productId, uid) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.users}/${uid}/views/delete/${productId}`
  );
  return response.data;
};
