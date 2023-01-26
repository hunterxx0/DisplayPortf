import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const getRequestedProducts = async () => {
  const response = await axios.get(`${API_ENDPOINTS.products}?sort=created_at`);

  return response.data;
};
