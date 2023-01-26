import axios from 'axios';
import { API_ENDPOINTS } from '../Utils/constants';

const getUserAndProduct = async (productId, u) => {
  const gendpoints = [
    `${API_ENDPOINTS.products}/${productId}?visit=true&userId=${u?.id}`,
  ];

  if (u?.id && u?.role === 'user')
    gendpoints.push(`${API_ENDPOINTS.users}/${u?.id}`);
  const res = await Promise.all(
    gendpoints.map((endpoint) => axios.get(endpoint))
  );
  return res;
};

export default getUserAndProduct;
