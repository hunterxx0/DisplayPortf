import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getMultiProductsEndpointsByQueryWithUser = async (user) => {
  const params = { reverse: '-1' };
  const endpoints = [
    `${API_ENDPOINTS.products}?sort=created_at`,
    `${API_ENDPOINTS.products}?sort=favorite_count`,
    `${API_ENDPOINTS.products}?sort=views`,
  ];
  if (user && user.role === 'user')
    endpoints.push(`${API_ENDPOINTS.users}/${user?.id}`);
  const res = await Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint, { params }))
  );
  return res;
};

export default getMultiProductsEndpointsByQueryWithUser;
