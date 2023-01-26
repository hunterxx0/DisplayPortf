import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getRelatedCategoryAndSeller = async (res) => {
  const endpoints = [
    `${API_ENDPOINTS.products}/category/${res[0].data.category}`,
    `${API_ENDPOINTS.products}/seller/${res[0].data.seller_name}`,
    `${API_ENDPOINTS.sellers}/name/${res[0].data.seller_name}`,
  ];

  const response = await Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint))
  );
  return response;
};

export default getRelatedCategoryAndSeller;
