import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

export const getUserRecentlyViewedProducts = async (
  recentlyViewedProductsIds = [],
  isHome
) => {
  const endpoints = recentlyViewedProductsIds.map(
    (id) => `${API_ENDPOINTS.products}/${id}`
  );

  const response = await Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint))
  );
  if (isHome) return response;
  return response.map((result) => result.data);
};
