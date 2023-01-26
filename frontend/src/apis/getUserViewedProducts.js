import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const getUserViewedProducts = async (favorites) => {
  const endpoints = favorites.map(
    (product_id) => `${API_ENDPOINTS.products}/${product_id}`
  );
  const res = await Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint))
  );
  return res.map((result) => result.data);
};
